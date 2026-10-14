const { db } = require('../services/csvParser');

exports.getMovies = (req, res) => {
  const { status, search, area, cinema_id } = req.query;
  let movies = db.get('movies');

  if (status) {
    movies = movies.filter(m => m.status === status);
  }

  if (search) {
    const s = search.toLowerCase();
    movies = movies.filter(m => m.title.toLowerCase().includes(s));
  }

  if (area || cinema_id) {
    const showtimes = db.get('showtimes');
    const cinemas = db.get('cinemas');
    
    const validMovieIds = new Set();
    
    showtimes.forEach(st => {
      let matches = true;
      if (cinema_id && st.cinema_id !== cinema_id) matches = false;
      
      if (area && matches) {
        const cinema = cinemas.find(c => c.id === st.cinema_id);
        if (!cinema || cinema.location.toLowerCase() !== area.toLowerCase()) {
          matches = false;
        }
      }
      
      if (matches) validMovieIds.add(st.movie_id);
    });
    
    movies = movies.filter(m => validMovieIds.has(m.id));
  }

  // Remove synopsis and cast to match the contract for list? Wait, contract for /api/movies doesn't have synopsis and cast. Let's map it.
  const mappedMovies = movies.map(m => ({
    id: m.id,
    title: m.title,
    genre: m.genre,
    duration: m.duration,
    age_rating: m.age_rating,
    poster_url: m.poster_url,
    status: m.status
  }));

  res.json({
    success: true,
    data: mappedMovies
  });
};

exports.getMovieById = (req, res) => {
  const { id } = req.params;
  const movie = db.get('movies').find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Movie not found',
        details: []
      }
    });
  }

  res.json({
    success: true,
    data: movie
  });
};

exports.getCinemas = (req, res) => {
  const { area, chain } = req.query;
  let cinemas = db.get('cinemas');

  if (area) {
    cinemas = cinemas.filter(c => c.location.toLowerCase() === area.toLowerCase());
  }

  if (chain) {
    cinemas = cinemas.filter(c => c.chain.toLowerCase() === chain.toLowerCase());
  }

  res.json({
    success: true,
    data: cinemas
  });
};

exports.getShowtimes = (req, res) => {
  const { movie_id, cinema_id, area, date } = req.query;
  let showtimes = db.get('showtimes');

  if (movie_id) showtimes = showtimes.filter(s => s.movie_id === movie_id);
  if (cinema_id) showtimes = showtimes.filter(s => s.cinema_id === cinema_id);
  if (date) showtimes = showtimes.filter(s => s.date === date);
  if (area) {
    const cinemas = db.get('cinemas');
    const validCinemaIds = new Set(
      cinemas.filter(c => c.location.toLowerCase() === area.toLowerCase()).map(c => c.id)
    );
    showtimes = showtimes.filter(s => validCinemaIds.has(s.cinema_id));
  }

  res.json({
    success: true,
    data: showtimes
  });
};

exports.getSnacks = (req, res) => {
  const snacks = db.get('snacks');
  res.json({
    success: true,
    data: snacks
  });
};

exports.validateVoucher = (req, res) => {
  const { code } = req.body;
  
  if (!code) {
      return res.status(400).json({
          success: false,
          error: {
              code: 'INVALID_REQUEST',
              message: 'Voucher code is required',
              details: []
          }
      });
  }

  const voucher = db.get('vouchers').find(v => v.code === code);

  if (!voucher) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_VOUCHER',
        message: 'Kode voucher tidak valid atau sudah kadaluarsa',
        details: []
      }
    });
  }

  res.json({
    success: true,
    data: voucher,
    message: 'Voucher applied successfully'
  });
};

exports.mockConfirmBooking = (req, res) => {
  // In a real app, validate payload. Here we just mock a success response.
  res.json({
    success: true,
    data: {
      booking_id: `TX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: "SUCCESS"
    },
    message: "Pembayaran simulasi berhasil"
  });
};

exports.healthCheck = (req, res) => {
  res.json({
    success: true,
    data: { status: 'OK' },
    message: 'Server is healthy'
  });
};
