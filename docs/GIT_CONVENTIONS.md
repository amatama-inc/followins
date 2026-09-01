# Panduan Konvensi Git (Git Conventions)

Dokumen ini berisi standar penamaan *branch* dan penulisan pesan *commit* yang umum digunakan oleh *software engineer* profesional, merujuk pada standar [Conventional Commits](https://www.conventionalcommits.org/) dan panduan industri (*cheatsheet*).

---

## 1. Aturan Penamaan Branch (Branching Strategy)
Aturan penamaan branch saat bekerja dalam tim umumnya menggunakan format:

```text
<kategori-branch>/<nama-singkat-pekerjaan>
```
Atau jika tim Anda besar dan butuh penanda kepemilikan:
```text
<nama-developer>/<kategori-branch>/<nama-pekerjaan>
```

### Daftar Kategori Branch yang Lazim Digunakan:
| Prefix Branch | Digunakan Untuk | Contoh Nama Branch |
|---|---|---|
| **`feature/`** atau **`feat/`** | Membuat fitur baru. Dibuat dari branch `main` atau `develop`. | `feature/google-login`, `tama/feat/dark-mode` |
| **`bugfix/`** atau **`fix/`** | Memperbaiki error (bug) pada aplikasi yang sedang dibuat/dites (belum live). | `bugfix/navbar-mobile`, `tama/fix/submit-error` |
| **`hotfix/`** | Memperbaiki error DARURAT/KRITIS pada aplikasi yang sudah *Live* (Production). Dibuat langsung dari branch `main` dan harus segera digabung kembali ke `main`. | `hotfix/database-crash`, `hotfix/payment-error` |
| **`release/`** | Persiapan akhir sebelum kode diluncurkan ke publik (misal untuk ganti versi atau testing terakhir). | `release/v1.2.0`, `release/v2.0` |
| **`chore/`** | Tugas internal yang tidak ada hubungannya dengan fitur aplikasi (seperti update library). | `chore/update-nextjs` |
| **`docs/`** | Perubahan yang murni hanya untuk menulis dokumentasi. | `docs/update-readme` |

*(Catatan: Gunakan tanda strip `-` untuk memisahkan kata, hindari spasi atau `_`)*

---

## 2. Format Pesan Commit (Conventional Commits)
Format standar industri untuk menulis pesan saat menyimpan (*commit*) kode:

```text
<tipe>(<opsional area/scope>): <deskripsi singkat>

[opsional body / deskripsi panjang]

[opsional footer]
```

### Daftar Tipe / Prefix Commit Lengkap:

| Tipe Commit | Digunakan Untuk | Contoh Pesan Commit |
|---|---|---|
| **`feat:`** | Menambahkan atau menyesuaikan fitur baru pada API atau UI. | `feat: tambah tombol login` |
| **`fix:`** | Memperbaiki *bug* atau error pada kode (API atau UI). | `fix(auth): atasi error upload gambar` |
| **`refactor:`** | Merestrukturisasi atau menulis ulang kode tanpa mengubah perilaku fungsinya di sisi user/API. | `refactor: sederhanakan fungsi perhitungan umur` |
| **`perf:`** | Spesifik untuk meningkatkan performa/kecepatan aplikasi (termasuk jenis *refactor* khusus). | `perf: percepat proses loading tabel` |
| **`style:`** | Perubahan format penulisan kode (seperti spasi, format, titik koma) yang tidak mengubah logika. **Lazim juga digunakan untuk perombakan murni tampilan (UI/CSS)**. | `style: rapikan indentasi` atau `style(ui): ubah warna tombol` |
| **`test:`** | Menambahkan kode *testing* otomatis yang hilang atau memperbaiki testing yang ada. | `test: tambah unit test untuk fitur login` |
| **`docs:`** | Perubahan yang murni untuk dokumentasi (README, komentar kode). | `docs: perbarui panduan instalasi` |
| **`build:`** | Perubahan pada sistem/konfigurasi *build* atau penambahan *dependencies* (npm, Webpack, dll). | `build: update dependencies` |
| **`ops:`** | Perubahan aspek operasional infrastruktur, skrip *deploy*, CI/CD, backup, dll. | `ops: update konfigurasi Docker` |
| **`chore:`** | Tugas-tugas rutin/bersih-bersih dasar (misal initial commit, modifikasi `.gitignore`). | `chore: init` |
| **`revert:`** | Membatalkan/memutar mundur kode ke commit sebelumnya. Biasanya berisi teks dari commit yang di-revert. | `revert: "feat: tambah animasi halaman"` |

---

### Bagian-Bagian Penting Lainnya pada Pesan Commit

#### 1. Scope (Area/Cakupan)
- Menyediakan konteks tambahan untuk menunjukkan area kode mana yang diubah.
- Sifatnya **opsional** dan ditempatkan dalam tanda kurung `()`.
- *Catatan: Sebaiknya jangan jadikan ID tiket/issue sebagai scope.*
- **Contoh:** `feat(shopping cart): tambah tombol checkout`, `fix(api): perbaiki checksum`

#### 2. Deskripsi
- Penjelasan padat mengenai apa yang dilakukan commit tersebut.
- Sifatnya **wajib**.
- Gunakan kalimat pasif/perintah (imperative) dalam *present tense*: misal gunakan kata `tambah` (add) bukan `menambahkan` (added).
- **Tidak perlu** huruf kapital di awal deskripsi.
- **Tidak perlu** tanda titik (`.`) di akhir deskripsi.

#### 3. Body (Badan Pesan)
- Penjelasan yang lebih mendetail (bisa beberapa baris) untuk menjelaskan *motivasi* di balik perubahan atau perbedaannya dengan perilaku sebelumnya.
- Sifatnya **opsional**. Harus dipisahkan dengan baris kosong dari Deskripsi.

#### 4. Footer (Catatan Kaki)
- Sifatnya **opsional**, namun sering dipakai untuk menautkan nomor referensi *issue* (misal: `Closes #123`, `Fixes JIRA-456`).
- Wajib diisi jika terdapat *Breaking Changes*.

#### 5. Breaking Changes Indicator `!`
- Jika commit memperkenalkan suatu perubahan signifikan yang merusak kompatibilitas fitur sebelumnya, letakkan tanda seru `!` sesudah *scope/type*, tepat sebelum tanda titik dua `:`.
- **Contoh:** `feat(api)!: hapus endpoint status`
- Penjelasan detail mengenai *breaking changes* ini juga harus dicantumkan di bagian **Footer** dengan awalan teks `BREAKING CHANGE:`.

---

## 3. Aturan Semantic Versioning
Bagi project yang menerapkan sistem versi (seperti rilis versi `1.0.0`), konvensi commit ini sangat berkaitan erat:
- Adanya **Breaking Changes** (`!`) -> Anda harus menaikkan **Major Version** (contoh dari `1.0.0` menjadi `2.0.0`).
- Adanya penambahan fitur/perubahan API (`feat` / `fix`) -> Anda harus menaikkan **Minor Version** (contoh dari `1.0.0` menjadi `1.1.0`).
- Tipe lainnya (`chore`, `docs`, `style`, dll) -> Cukup menaikkan **Patch Version** (contoh dari `1.0.0` menjadi `1.0.1`).
