# API Contract Specification - CineTix

## 1. Protokol & Konvensi Umum
- **Base URL:** `/api/v1`
- **Format Data:** JSON (`application/json`)
- **Header Standar:** `Content-Type: application/json`
- **Format Standar Respon Sukses:**
  ```json
  {
    "success": true,
    "data": {},
    "message": "Deskripsi singkat"
  }
  ```
- **Format Standar Respon Error:**
  ```json
  {
    "success": false,
    "error": {
      "code": "ERROR_CODE",
      "message": "Detail pesan error",
      "details": []
    }
  }
  ```

## 2. Rincian Endpoint

### [GET] `/api/movies`
- **Deskripsi**: Mendapatkan daftar film dari `movies.csv`. Mendukung filter berbasis status dan pencarian judul.
- **Autentikasi**: Publik
- **Request Parameters**:
  - Query Params: 
    - `status` (string, optional) - Nilai: 'Now Showing' atau 'Coming Soon'
    - `search` (string, optional) - Keyword judul film
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "m1",
          "title": "Spider-Man",
          "genre": "Action",
          "duration": "120 min",
          "age_rating": "PG-13",
          "poster_url": "url_to_image",
          "status": "Now Showing"
        }
      ]
    }
    ```

### [GET] `/api/movies/:id`
- **Deskripsi**: Mendapatkan detail informasi sebuah film spesifik dari `movies.csv` berdasarkan ID.
- **Autentikasi**: Publik
- **Request Parameters**:
  - Path Params: `id` (string, required)
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "id": "m1",
        "title": "Spider-Man",
        "genre": "Action",
        "duration": "120 min",
        "age_rating": "PG-13",
        "synopsis": "...",
        "cast": "Tom Holland, Zendaya",
        "poster_url": "url_to_image",
        "status": "Now Showing"
      }
    }
    ```
  - `404 Not Found`: Jika ID film tidak ditemukan di CSV.

### [GET] `/api/cinemas`
- **Deskripsi**: Mendapatkan daftar lokasi bioskop dari `cinemas.csv`.
- **Autentikasi**: Publik
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "c1",
          "name": "CineTix Grand Mall",
          "location": "Jakarta"
        }
      ]
    }
    ```

### [GET] `/api/showtimes`
- **Deskripsi**: Mendapatkan daftar jadwal tayang dari `showtimes.csv`. Filter dapat dilakukan berdasarkan film, lokasi bioskop, atau tanggal.
- **Autentikasi**: Publik
- **Request Parameters**:
  - Query Params:
    - `movie_id` (string, optional)
    - `cinema_id` (string, optional)
    - `date` (string, YYYY-MM-DD, optional)
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "s1",
          "movie_id": "m1",
          "cinema_id": "c1",
          "studio_name": "Studio 1",
          "date": "2023-10-15",
          "time": "14:00",
          "price": 50000
        }
      ]
    }
    ```

### [GET] `/api/snacks`
- **Deskripsi**: Mendapatkan daftar katalog F&B (Food and Beverage) dari `snacks.csv`.
- **Autentikasi**: Publik
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "sn1",
          "name": "Popcorn Caramel",
          "type": "Popcorn",
          "size": "L",
          "price": 45000,
          "image_url": "url_to_image"
        }
      ]
    }
    ```

### [POST] `/api/vouchers/validate`
- **Deskripsi**: Memvalidasi kode voucher promosi dari `vouchers.csv`. Mengembalikan nilai potongan harga.
- **Autentikasi**: Memerlukan pengguna teregistrasi (meski divalidasi lokal, endpoint opsional mem-verifikasi)
- **Request Body**:
  ```json
  {
    "code": "PROMO20"
  }
  ```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "code": "PROMO20",
        "discount_type": "percentage",
        "discount_value": 20
      },
      "message": "Voucher applied successfully"
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "success": false,
      "error": {
        "code": "INVALID_VOUCHER",
        "message": "Kode voucher tidak valid atau sudah kadaluarsa",
        "details": []
      }
    }
    ```

### [POST] `/api/bookings/mock-confirm`
- **Deskripsi**: Endpoint opsional/simulasi (dummy endpoint) untuk memvalidasi akhir proses checkout di backend (meskipun riwayat sepenuhnya disimpan di LocalStorage pengguna).
- **Autentikasi**: Publik/User
- **Request Body**:
  ```json
  {
    "user_id": "u1",
    "showtime_id": "s1",
    "seats": ["A1", "A2"],
    "snacks": [
      { "id": "sn1", "quantity": 1 }
    ],
    "total_amount": 145000,
    "payment_method": "QRIS"
  }
  ```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "data": {
        "booking_id": "TX-12345678",
        "status": "SUCCESS"
      },
      "message": "Pembayaran simulasi berhasil"
    }
    ```
