# Short-Next

[![Build Status](https://img.shields.io/github/actions/workflow/status/vryptt/short-next/ci.yml?branch=main)](https://github.com/vryptt/short-next/actions)
[![License](https://img.shields.io/github/license/vryptt/short-next)](LICENSE)
[![Deployment](https://img.shields.io/badge/deploy-vercel-brightgreen)](https://vercel.com/)

Short-Next adalah aplikasi URL Shortener berbasis [Next.js 14 App Router](https://nextjs.org/docs/app/building-your-application/routing) dengan dukungan **MongoDB** dan penyimpanan riwayat link menggunakan **cookies**.  
Aplikasi ini tidak memerlukan login â€” dapat digunakan langsung dari halaman utama.

---

## Fitur
- Pemendekan URL langsung dari halaman utama
- Penyimpanan semua link yang pernah dibuat user di cookies (riwayat lokal)
- Backend menggunakan MongoDB untuk menyimpan data shortlink
- Dibangun dengan Next.js 14 (App Router)
- Tampilan modern dan responsive

---

## Tech Stack
- [Next.js 14](https://nextjs.org/) (App Router)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/) (untuk styling)
- [Cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies) untuk menyimpan riwayat user

---

## Struktur Project
```
short-next/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ api/shorten/route.ts   # API untuk membuat short URL
â”‚   â”œâ”€â”€ page.tsx               # Landing page utama
â”œâ”€â”€ lib/
â”‚   â””â”€â”€ mongodb.ts             # Koneksi MongoDB
â”œâ”€â”€ models/
â”‚   â””â”€â”€ Link.ts                # Schema Mongoose
â”œâ”€â”€ package.json
â””â”€â”€ README.md
```

---

## Instalasi & Menjalankan
### 1. Clone repository
```bash
git clone https://github.com/vryptt/short-next.git
cd short-next
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment
Buat file `.env.local` dengan isi:
```env
MONGODB_URI=mongodb://admin:password@127.0.0.1:27017/admin
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Jalankan development server
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## Deployment
Aplikasi dapat di-deploy ke:
- [Vercel](https://vercel.com/) (direkomendasikan)
- VPS / Server dengan Node.js
- Docker (opsional, bisa ditambahkan nanti)

---

## Lisensi
MIT License Â© 2025 [Vryptt](https://github.com/vryptt)
