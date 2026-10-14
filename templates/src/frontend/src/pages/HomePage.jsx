import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { api } from '../services/api';

const DUMMY_COMING_SOON = [
  { id: 'm4', title: 'Deadpool 3', genre: 'Action, Comedy', duration: '120 min', rating: '-', age: 'R-21', status: 'Coming Soon', poster: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=400&h=600&fit=crop' },
  { id: 'm5', title: 'Gladiator 2', genre: 'Action, Drama', duration: '150 min', rating: '-', age: 'R-21', status: 'Coming Soon', poster: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=400&h=600&fit=crop' },
];

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.id}`} className="block relative group overflow-hidden rounded-xl bg-slate-800/60 border border-white/5 hover:border-brand-amber-500/50 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.8),0_0_16px_rgba(245,158,11,0.25)] aspect-[2/3]">
    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute top-3 left-3">
      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md text-white backdrop-blur-md ${movie.status === 'Now Showing' ? 'bg-emerald-600/90' : 'bg-brand-amber-600/90'}`}>
        {movie.status}
      </span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <div className="w-full">
        <h3 className="truncate font-semibold text-slate-100 group-hover:text-brand-amber-400 transition-colors">{movie.title}</h3>
        <div className="text-xs text-slate-400 flex items-center justify-between mt-1">
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
        </div>
      </div>
    </div>
  </Link>
);

const HomePage = () => {
  const selectedArea = useSelector((state) => state.booking.selectedArea);
  const [nowShowing, setNowShowing] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await api.getMovies({ area: selectedArea });
      setNowShowing(movies || []);
    };
    fetchMovies();
  }, [selectedArea]);
  
  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[480px] bg-slate-900 mt-16">
        <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&h=480&fit=crop" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <div className="flex gap-2 mb-3">
            <span className="border border-brand-amber-400/60 bg-brand-amber-500/10 text-brand-amber-300 text-xs px-2.5 py-1 rounded-full font-bold">PG-13</span>
            <span className="bg-slate-800/80 text-slate-300 text-xs px-2.5 py-1 rounded-full">Sci-Fi</span>
            <span className="text-brand-amber-400 text-sm font-bold flex items-center gap-1">⭐ 8.9/10</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Dune: Part Two</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-6 hidden md:block">
            Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/movie/m2" className="bg-brand-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg transition-all hover:bg-brand-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              Book Tickets Now
            </Link>
            <button className="bg-transparent border border-slate-600 text-slate-100 hover:border-brand-amber-400 hover:text-brand-amber-400 rounded-lg px-5 py-2.5 transition-all flex items-center gap-2">
              <Play className="w-4 h-4" /> Watch Trailer
            </button>
          </div>
        </div>
      </section>

      {/* Area Filter Pills */}
      <section className="container mx-auto px-4 py-8 border-b border-white/10">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <span className="text-slate-400 font-medium whitespace-nowrap">Area:</span>
          {['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta', 'Bali'].map(area => (
            <div 
              key={area}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${selectedArea === area ? 'bg-brand-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}
            >
              {area}
            </div>
          ))}
        </div>
      </section>

      {/* Now Showing */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50 uppercase">Now Showing di {selectedArea}</h2>
        </div>
        
        {nowShowing.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {nowShowing.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        ) : (
          <p className="text-slate-400">Tidak ada film yang sedang tayang di area ini.</p>
        )}
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50 mb-8 uppercase">COMING SOON</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {DUMMY_COMING_SOON.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
