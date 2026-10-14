import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowtime, setMovie, setCinema } from '../store/bookingSlice';
import { getChainBadgeColor } from '../data/mockData';
import { api } from '../services/api';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedArea = useSelector(state => state.booking.selectedArea);
  
  const [movie, setMovieState] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [showtimes, setShowtimes] = useState([]);
  const [selectedTimeId, setSelectedTimeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const foundMovie = await api.getMovieById(id);
      if (foundMovie) {
        setMovieState(foundMovie);
        // Note: Ideally backend returns cinemas that show this movie. 
        // For fallback mock purposes, we get cinemas by area.
        const availableCinemas = await api.getCinemas({ area: selectedArea });
        setCinemas(availableCinemas);
        if (availableCinemas.length > 0) {
          setSelectedCinemaId(availableCinemas[0].id);
        } else {
          setSelectedCinemaId('');
        }
      }
    };
    fetchData();
  }, [id, selectedArea]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (movie && selectedCinemaId) {
        const resultShowtimes = await api.getShowtimes({ movie_id: movie.id, cinema_id: selectedCinemaId, area: selectedArea });
        setShowtimes(resultShowtimes);
        setSelectedTimeId(null);
      } else {
        setShowtimes([]);
      }
    };
    fetchShowtimes();
  }, [selectedCinemaId, movie, selectedArea]);

  const handleBook = () => {
    if (selectedTimeId && movie) {
      const showtime = showtimes.find(s => s.id === selectedTimeId);
      const cinema = cinemas.find(c => c.id === selectedCinemaId);
      dispatch(setMovie(movie));
      dispatch(setCinema(cinema));
      dispatch(setShowtime(showtime));
      navigate('/seats');
    }
  };

  if (!movie) return <div className="container mx-auto px-4 py-8 text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link to="/" className="text-slate-400 hover:text-white mb-6 inline-block">&lt; Kembali ke Katalog</Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img src={movie.poster} alt={movie.title} className="w-full rounded-xl shadow-2xl" />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">{movie.title}</h1>
          <div className="text-sm text-slate-400 mb-6 flex flex-wrap gap-4">
            <span>Rating: {movie.rating}</span>
            <span>Durasi: {movie.duration}</span>
            <span>Genre: {movie.genre}</span>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">{movie.synopsis}</p>
          <p className="text-slate-400 mb-8"><strong className="text-slate-200">Pemeran:</strong> {movie.cast}</p>
          
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">PILIH BIOSKOP & JADWAL TAYANG ({selectedArea})</h3>
            
            {cinemas.length > 0 ? (
              <>
                <div className="mb-4">
                  <select 
                    value={selectedCinemaId}
                    onChange={(e) => setSelectedCinemaId(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2 w-full md:w-auto min-w-[300px]"
                  >
                    {cinemas.map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.chain}</option>
                    ))}
                  </select>
                </div>
                
                {selectedCinemaId && (
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${getChainBadgeColor(cinemas.find(c => c.id === selectedCinemaId)?.chain)}`}>
                      {cinemas.find(c => c.id === selectedCinemaId)?.chain}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-2">PILIH JAM TAYANG & TIPE STUDIO</h4>
                    <div className="flex flex-wrap gap-3">
                      {showtimes.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedTimeId(s.id)}
                          className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-sm border transition-all ${
                            selectedTimeId === s.id 
                              ? 'bg-brand-amber-500 border-brand-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-brand-amber-400'
                          }`}
                        >
                          <span className="text-lg">{s.time}</span>
                          <span className="text-xs opacity-80">{s.type}</span>
                          <span className="text-xs font-normal mt-1">Rp {s.price.toLocaleString('id-ID')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <button 
                    onClick={handleBook}
                    disabled={!selectedTimeId}
                    className="bg-brand-amber-500 text-slate-950 font-bold px-8 py-3 rounded-lg transition-all hover:bg-brand-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pilih Kursi
                  </button>
                </div>
              </>
            ) : (
              <p className="text-slate-400">Tidak ada jadwal tayang untuk film ini di area {selectedArea}.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
