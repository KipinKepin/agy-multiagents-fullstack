# Software Requirements Specification (SRS) - CineTix

## 1. Project Overview & Objectives
**CineTix** adalah aplikasi web pemesanan tiket bioskop dan makanan ringan (F&B) dengan pengalaman pengguna yang interaktif dan modern. Tujuan utama dari sistem ini adalah mensimulasikan alur kerja pemesanan tiket, pemilihan kursi secara visual, dan pembelian F&B, dengan checkout terintegrasi dan sistem pembayaran simulasi. Sistem akan menggunakan data dari file CSV (tanpa menggunakan database nyata) dan menargetkan fungsionalitas di client-side dan API backend ringan.

**In-Scope:**
- Registrasi dan login pengguna (berbasis LocalStorage).
- Katalog film (Now Showing, Coming Soon) dengan fitur pencarian dan filter.
- Detail film (trailer, sinopsis, cast, rating).
- Pemilihan jadwal tayang (Bioskop, Studio, Tanggal, Jam).
- Pemilihan kursi interaktif (Regular, VIP, Couple) dengan validasi status ketersediaan (mock).
- Katalog dan keranjang F&B (Popcorn, Minuman, Combo).
- Checkout terintegrasi dengan kalkulasi harga, pajak, biaya admin, dan voucher promo (dummy).
- Mock payment (QRIS, E-Wallet, VA).
- E-Ticket generator (mock QR/barcode) dan riwayat pemesanan (Order History).
- Tema gelap (Dark Cinema Theme) yang sepenuhnya responsif.

**Out-of-Scope:**
- Integrasi Payment Gateway sungguhan.
- Penggunaan sistem database relasional atau NoSQL.
- Notifikasi email atau SMS sungguhan.
- Admin dashboard untuk mengelola CSV (dianggap CSV diatur manual/static).

## 2. User Personas
- **Guest / Unregistered User:** Pengguna yang hanya ingin melihat katalog film, jadwal, dan detail film. Harus login/register saat ingin melakukan pemesanan.
- **Customer / Registered User:** Pengguna yang memiliki akun (mock) yang dapat memesan tiket, kursi, F&B, serta melihat riwayat tiket mereka.

## 3. Functional Requirements (FR)
- **[FR-001] User Authentication:** Sistem harus memungkinkan pengguna mendaftar dan masuk menggunakan LocalStorage.
- **[FR-002] Movie Catalog:** Sistem harus menampilkan daftar film (Now Showing & Coming Soon) yang di-load dari API Backend (sumber `movies.csv`), dengan kemampuan pencarian dan filter genre/rating.
- **[FR-003] Movie Details:** Sistem harus menampilkan halaman detail film yang mencakup poster, sinopsis, daftar pemeran (cast), durasi, age rating, dan modal trailer embed.
- **[FR-004] Showtime Selection:** Sistem harus memungkinkan pengguna memilih bioskop, studio, tanggal, dan jam tayang dari API Backend (sumber `showtimes.csv` dan `cinemas.csv`).
- **[FR-005] Interactive Seat Booking:** Sistem harus menyediakan layout kursi interaktif. Kursi dibedakan menjadi Regular, VIP, dan Couple, serta status Available, Selected, Sold.
- **[FR-006] F&B Purchase:** Sistem harus menampilkan katalog F&B (sumber `snacks.csv`), memungkinkan pemilihan variasi (ukuran), dan menambahkannya ke keranjang (cart).
- **[FR-007] Integrated Checkout Flow:** Sistem harus menggabungkan pesanan tiket, kursi, dan F&B ke dalam satu keranjang belanja. Menghitung subtotal, pajak, biaya admin, dan diskon dari voucher promo (sumber `vouchers.csv`).
- **[FR-008] Mock Payment:** Sistem harus menyediakan antarmuka pembayaran simulasi (QRIS, E-Wallet, Virtual Account) dan menghasilkan status "Sukses" setelah konfirmasi.
- **[FR-009] E-Ticket Generation:** Sistem harus men-generate E-Ticket (berisi detail jadwal, kursi, F&B, dan dummy barcode/QR code) setelah pembayaran berhasil.
- **[FR-010] Order History:** Sistem harus menyimpan riwayat pemesanan pengguna (di LocalStorage) dan dapat diakses di halaman "My Tickets".

## 4. Non-Functional Requirements (NFR)
- **[NFR-001] Performance:** Backend API harus dapat mem-parsing file CSV dan merespons dalam waktu kurang dari 500ms.
- **[NFR-002] Security:** Password user disamarkan (hashed mock) sebelum disimpan di LocalStorage. Validasi input form dilakukan di sisi klien.
- **[NFR-003] Reliability & Availability:** Jika format CSV korup, backend harus mengirimkan respons error yang graceful tanpa membuat server crash.
- **[NFR-004] Usability:** Antarmuka harus mengusung "Dark Cinema Theme", fully responsive di layar Desktop, Tablet, dan Mobile. Aksesibilitas warna yang kontras dan navigasi intuitif.

## 5. User Stories & Acceptance Criteria
### US-001: Browse Movies
- **As a** Customer/Guest, **I want to** view a list of 'Now Showing' and 'Coming Soon' movies, **So that** I can decide what to watch.
- **Acceptance Criteria (Gherkin):**
  - **Given** I am on the home page
  - **When** I scroll through the movie sections
  - **Then** I should see movie posters, titles, and genres clearly separated by categories.

### US-002: Select Seats
- **As a** Registered User, **I want to** select my preferred seats interactively, **So that** I can sit where I want.
- **Acceptance Criteria (Gherkin):**
  - **Given** I have selected a movie and showtime
  - **When** I click on an available VIP seat
  - **Then** the seat color changes to 'Selected', and the ticket price is added to my cart.

### US-003: Add F&B to Cart
- **As a** Registered User, **I want to** add snacks and drinks to my order, **So that** I can pick them up at the cinema.
- **Acceptance Criteria (Gherkin):**
  - **Given** I am in the F&B section of the booking flow
  - **When** I click "Add" on a Large Popcorn
  - **Then** the item is added to my cart and the subtotal updates immediately.

### US-004: Integrated Checkout & Payment
- **As a** Registered User, **I want to** checkout and pay via mock payment, **So that** I can get my tickets.
- **Acceptance Criteria (Gherkin):**
  - **Given** I have items in my cart and applied a valid promo code
  - **When** I select "QRIS" as payment and click "Pay Now"
  - **Then** I see a success screen and my E-Ticket with a mock QR Code is generated.

## 6. Edge Cases & Error Handling Scenarios
- **Invalid Promo Code:** Jika user memasukkan promo code yang salah, tampilkan pesan error merah dan kalkulasi total tidak berubah.
- **Seat Race Condition (Mock):** Karena tidak ada DB, asumsikan ketersediaan kursi di-mock per session. Jika user men-refresh, status kursi 'Sold' yang di-mock secara random tetap konsisten di session tersebut jika memungkinkan, atau reset (sesuai batasan tanpa DB persisten).
- **Empty Cart Checkout:** Cegah navigasi ke halaman pembayaran jika belum ada kursi yang dipilih.
- **Backend Down / CSV Missing:** Jika API gagal merespons atau file CSV tidak ditemukan, frontend menampilkan UI error state "Unable to load data, please try again later" daripada blank page.

## 7. Assumptions, Dependencies, & Technical Constraints
- **Tech Stack Frontend:** React, Redux Toolkit, Tailwind CSS.
- **Tech Stack Backend:** Node.js, Express.
- **Database:** NONE. Semua data (movies, showtimes, cinemas, snacks, vouchers) disuplai sebagai static CSV file di server backend, diparsing di memori/on the fly.
- **Auth & Session:** 100% Client-side storage (LocalStorage). Backend tidak memverifikasi JWT token untuk simplicity (atau bisa di-mock).
- **Environment:** Berjalan di lingkungan Node.js standar.
