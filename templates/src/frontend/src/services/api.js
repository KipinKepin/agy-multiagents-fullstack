import { getMoviesByArea, CINEMAS, SHOWTIMES } from '../data/mockData';

const BASE_URL = 'http://localhost:3000/api/v1';

export const api = {
  getMovies: async (params = {}) => {
    try {
      const url = new URL(`${BASE_URL}/movies`);
      if (params.area) url.searchParams.append('area', params.area);
      if (params.status) url.searchParams.append('status', params.status);
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mockData getMovies:', error);
      return getMoviesByArea(params.area);
    }
  },

  getMovieById: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mockData getMovieById:', error);
      const allMovies = getMoviesByArea('Jakarta'); 
      return allMovies.find(m => m.id === id);
    }
  },

  getCinemas: async (params = {}) => {
    try {
      const url = new URL(`${BASE_URL}/cinemas`);
      if (params.area) url.searchParams.append('area', params.area);
      if (params.chain) url.searchParams.append('chain', params.chain);
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mockData getCinemas:', error);
      return CINEMAS.filter(c => !params.area || c.area === params.area);
    }
  },

  getShowtimes: async (params = {}) => {
    try {
      const url = new URL(`${BASE_URL}/showtimes`);
      if (params.movie_id) url.searchParams.append('movie_id', params.movie_id);
      if (params.cinema_id) url.searchParams.append('cinema_id', params.cinema_id);
      if (params.area) url.searchParams.append('area', params.area);
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mockData getShowtimes:', error);
      return SHOWTIMES.filter(s => 
        (!params.movie_id || s.movieId === params.movie_id) && 
        (!params.cinema_id || s.cinemaId === params.cinema_id)
      );
    }
  },

  getSnacks: async () => {
    try {
      const res = await fetch(`${BASE_URL}/snacks`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mockData getSnacks:', error);
      return [
        { id: 'sn1', name: 'Popcorn', size: 'Large', price: 50000, type: 'Food', image: 'https://images.unsplash.com/photo-1570146914561-12c8b746816e?w=200' },
        { id: 'sn2', name: 'Cola', size: 'Large', price: 25000, type: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200' },
        { id: 'sn3', name: 'Nachos', size: 'Medium', price: 45000, type: 'Food', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200' }
      ];
    }
  },

  validateVoucher: async (code) => {
    try {
      const res = await fetch(`${BASE_URL}/vouchers/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend not available, falling back to mock validation:', error);
      if (code === 'CINEMA20') return { valid: true, discount: 20 };
      if (code === 'POPCORN50') return { valid: true, discount: 50 };
      if (code === 'HEMAT10') return { valid: true, discount: 10 };
      return { valid: false, message: 'Invalid voucher' };
    }
  }
};
