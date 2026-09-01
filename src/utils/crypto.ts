const XOR_KEY = "F0ll0w1nsS3cR3tK3y";

/**
 * Melakukan enkripsi/dekripsi sederhana menggunakan XOR
 */
const xorCipher = (text: string): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ XOR_KEY.charCodeAt(i % XOR_KEY.length));
  }
  return result;
};

/**
 * Mengubah string menjadi Base64 + XOR untuk melindungi dari inspeksi memori (Anti-F12).
 */
export const obfuscate = (text: string): string => {
  try {
    const xored = xorCipher(encodeURIComponent(text));
    if (typeof window !== 'undefined') {
      return btoa(xored);
    }
    return Buffer.from(xored).toString('base64');
  } catch (_) {
    return text;
  }
};

/**
 * Mengembalikan string Base64 + XOR ke bentuk aslinya.
 */
export const deobfuscate = (obfuscatedText: string): string => {
  try {
    let xored = "";
    if (typeof window !== 'undefined') {
      xored = atob(obfuscatedText);
    } else {
      xored = Buffer.from(obfuscatedText, 'base64').toString('ascii');
    }
    return decodeURIComponent(xorCipher(xored));
  } catch (_) {
    return "Error-Deobfuscate";
  }
};
