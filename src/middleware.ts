import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Interface for Cloudflare KV
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export async function middleware(request: NextRequest) {
  // Bindings in Cloudflare are usually attached to process.env or globalThis
  // We cast it to any first to bypass strict TS checks for global environment
  const env = process.env as any;
  const KV: KVNamespace | undefined = env.RATE_LIMIT_KV;

  // Jika tidak ada KV (misal saat run dev di lokal tanpa wrangler), abaikan rate limit
  if (!KV) {
    return NextResponse.next();
  }

  // Mendapatkan IP address pengunjung dari header Cloudflare
  const ip = 
    request.headers.get('cf-connecting-ip') || 
    request.headers.get('x-forwarded-for') || 
    'unknown';

  if (ip === 'unknown') {
    return NextResponse.next();
  }

  // Membuat jendela waktu (Time Window) per 1 Menit
  // Date.now() / 60000 menghasilkan angka unik untuk setiap menit
  const windowMinute = Math.floor(Date.now() / 60000);
  
  // Kunci KV unik per IP dan per menit
  const key = `ratelimit:${ip}:${windowMinute}`;

  // BATAS RATE LIMIT: 60 Request per menit
  const LIMIT = 60;

  try {
    // Ambil jumlah request saat ini dari KV
    const currentCountStr = await KV.get(key);
    const count = currentCountStr ? parseInt(currentCountStr, 10) : 0;

    if (count >= LIMIT) {
      // Jika melebihi batas, tolak akses
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests', message: 'Tolong jangan spam!' }),
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Tambah hitungan request
    // Set expirationTtl ke 120 detik (2 menit) agar data KV otomatis terhapus untuk menghemat memori
    await KV.put(key, (count + 1).toString(), { expirationTtl: 120 });

    return NextResponse.next();
  } catch (error) {
    // Jika ada error pada KV (misal timeout), biarkan lolos agar web tidak down
    console.error('KV Rate Limit Error:', error);
    return NextResponse.next();
  }
}

// Menentukan rute mana saja yang terkena rate limit
export const config = {
  matcher: [
    /*
     * Rate limit berlaku untuk semua halaman kecuali:
     * - api (jika kamu punya API terpisah)
     * - _next/static (file statis JavaScript/CSS dari Next.js)
     * - _next/image (gambar yang dioptimasi Next.js)
     * - favicon.ico (ikon browser)
     * - gambar/aset publik lainnya (svg, png, jpg, dsb)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
