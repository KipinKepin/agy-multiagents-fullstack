export const AREAS = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta', 'Bali'];

export const MOVIES = [
  {
    id: 'm1',
    title: 'Spider-Man: No Way Home',
    genre: 'Action, Sci-Fi',
    duration: '148 min',
    rating: 'PG-13',
    status: 'Now Showing',
    synopsis: 'With Spider-Man\'s identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero.',
    cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400&h=600&fit=crop'
  },
  {
    id: 'm2',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi, Adventure',
    duration: '166 min',
    rating: 'PG-13',
    status: 'Now Showing',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&h=600&fit=crop'
  },
  {
    id: 'm3',
    title: 'Oppenheimer',
    genre: 'Biography, Drama, History',
    duration: '180 min',
    rating: 'R',
    status: 'Now Showing',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    cast: 'Cillian Murphy, Emily Blunt, Matt Damon',
    poster: 'https://images.unsplash.com/photo-1612865542235-569ac9ef5c4f?q=80&w=400&h=600&fit=crop'
  }
];

export const CINEMAS = [
  { id: 'c1', name: 'Plaza Senayan XXI', chain: 'XXI', area: 'Jakarta' },
  { id: 'c2', name: 'Grand Indonesia CGV', chain: 'CGV', area: 'Jakarta' },
  { id: 'c3', name: 'Pejaten Village Cinepolis', chain: 'Cinepolis', area: 'Jakarta' },
  { id: 'c4', name: 'Ciwalk XXI', chain: 'XXI', area: 'Bandung' },
  { id: 'c5', name: 'Paris Van Java CGV', chain: 'CGV', area: 'Bandung' },
  { id: 'c6', name: 'Tunjungan Plaza XXI', chain: 'XXI', area: 'Surabaya' },
  { id: 'c7', name: 'Marvell City CGV', chain: 'CGV', area: 'Surabaya' },
  { id: 'c8', name: 'Centre Point XXI', chain: 'XXI', area: 'Medan' },
  { id: 'c9', name: 'Sun Plaza Cinepolis', chain: 'Cinepolis', area: 'Medan' },
  { id: 'c10', name: 'Ambarrukmo XXI', chain: 'XXI', area: 'Yogyakarta' },
  { id: 'c11', name: 'Jwalk CGV', chain: 'CGV', area: 'Yogyakarta' },
  { id: 'c12', name: 'Beachwalk XXI', chain: 'XXI', area: 'Bali' },
  { id: 'c13', name: 'Lippo Mall Kuta Cinepolis', chain: 'Cinepolis', area: 'Bali' },
];

export const SHOWTIMES = [
  // Jakarta
  { id: 's1', cinemaId: 'c1', movieId: 'm1', time: '13:00', type: 'XXI The Premiere', price: 150000, date: '2026-10-10' },
  { id: 's2', cinemaId: 'c1', movieId: 'm1', time: '15:30', type: 'XXI IMAX', price: 100000, date: '2026-10-10' },
  { id: 's3', cinemaId: 'c2', movieId: 'm2', time: '14:00', type: 'CGV Velvet Class', price: 120000, date: '2026-10-10' },
  { id: 's4', cinemaId: 'c2', movieId: 'm2', time: '16:30', type: 'CGV 4DX', price: 95000, date: '2026-10-10' },
  { id: 's5', cinemaId: 'c3', movieId: 'm3', time: '18:00', type: 'Cinepolis VIP', price: 110000, date: '2026-10-10' },
  { id: 's6', cinemaId: 'c3', movieId: 'm1', time: '20:00', type: 'Regular', price: 50000, date: '2026-10-10' },
  // Bandung
  { id: 's7', cinemaId: 'c4', movieId: 'm2', time: '13:00', type: 'XXI The Premiere', price: 150000, date: '2026-10-10' },
  { id: 's8', cinemaId: 'c5', movieId: 'm1', time: '15:30', type: 'CGV 4DX', price: 95000, date: '2026-10-10' },
  // Surabaya
  { id: 's9', cinemaId: 'c6', movieId: 'm3', time: '14:00', type: 'XXI IMAX', price: 100000, date: '2026-10-10' },
  { id: 's10', cinemaId: 'c7', movieId: 'm1', time: '16:30', type: 'Regular', price: 50000, date: '2026-10-10' },
  // Medan
  { id: 's11', cinemaId: 'c8', movieId: 'm1', time: '18:00', type: 'Regular', price: 50000, date: '2026-10-10' },
  { id: 's12', cinemaId: 'c9', movieId: 'm2', time: '20:00', type: 'Cinepolis VIP', price: 110000, date: '2026-10-10' },
  // Yogyakarta
  { id: 's13', cinemaId: 'c10', movieId: 'm3', time: '13:00', type: 'Regular', price: 40000, date: '2026-10-10' },
  { id: 's14', cinemaId: 'c11', movieId: 'm1', time: '15:30', type: 'CGV Velvet Class', price: 100000, date: '2026-10-10' },
  // Bali
  { id: 's15', cinemaId: 'c12', movieId: 'm2', time: '14:00', type: 'XXI The Premiere', price: 150000, date: '2026-10-10' },
  { id: 's16', cinemaId: 'c13', movieId: 'm3', time: '16:30', type: 'Regular', price: 60000, date: '2026-10-10' },
];

export const getMoviesByArea = (area) => {
  // Find all cinemas in the area
  const areaCinemas = CINEMAS.filter(c => c.area === area).map(c => c.id);
  // Find all showtimes for these cinemas
  const areaShowtimes = SHOWTIMES.filter(s => areaCinemas.includes(s.cinemaId));
  // Extract unique movie IDs
  const areaMovieIds = [...new Set(areaShowtimes.map(s => s.movieId))];
  // Return the movies
  return MOVIES.filter(m => areaMovieIds.includes(m.id));
};

export const getShowtimesByMovieAndArea = (movieId, area) => {
  const areaCinemas = CINEMAS.filter(c => c.area === area).map(c => c.id);
  return SHOWTIMES.filter(s => s.movieId === movieId && areaCinemas.includes(s.cinemaId));
};

export const getCinemasForMovieInArea = (movieId, area) => {
  const showtimes = getShowtimesByMovieAndArea(movieId, area);
  const cinemaIds = [...new Set(showtimes.map(s => s.cinemaId))];
  return CINEMAS.filter(c => cinemaIds.includes(c.id));
};

export const getChainBadgeColor = (chain) => {
  if (chain === 'XXI') return 'bg-amber-600 text-white'; // Gold/Amber
  if (chain === 'CGV') return 'bg-red-700 text-white'; // Crimson Red
  if (chain === 'Cinepolis') return 'bg-cyan-800 text-white'; // Navy/Cyan
  return 'bg-slate-700 text-white';
};
