import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChainBadgeColor } from '../data/mockData';

const MyTickets = () => {
  const { bookingHistory } = useSelector(state => state.booking);
  const { user } = useSelector(state => state.auth);

  if (!user) {
    return <div className="p-8 text-center text-slate-300 mt-16">Silakan Sign In terlebih dahulu.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">My Tickets</h1>
      
      {bookingHistory.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-400 mb-4">Belum ada riwayat pemesanan.</p>
          <Link to="/" className="text-brand-amber-500 hover:text-brand-amber-400 font-medium">Cari Film &gt;</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {[...bookingHistory].reverse().map(order => (
            <div key={order.id} className="relative overflow-hidden rounded-2xl bg-[#090D16] border border-slate-700/80 p-6 sm:p-8">
              {/* E-Ticket Perforations */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#090D16] border-r border-slate-700/80 -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#090D16] border-l border-slate-700/80 -translate-y-1/2"></div>
              
              <div className="flex flex-col sm:flex-row justify-between mb-6 pb-6 border-b-2 border-dashed border-slate-700/80">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 uppercase mb-1">CINETIX PREMIERE PASS</h2>
                  <p className="text-brand-amber-500 text-sm font-mono tracking-widest">TICKET ID: {order.id}</p>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">CONFIRMED & PAID</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">MOVIE</p>
                  <p className="font-semibold text-slate-200">{order.movie.title} <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded ml-2">{order.movie.rating}</span></p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">CINEMA & STUDIO</p>
                  <p className="font-semibold text-slate-200 flex items-center gap-2">
                    {order.cinema?.name || 'CineTix Grand Mall'} 
                    {order.cinema?.chain && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${getChainBadgeColor(order.cinema.chain)}`}>
                        {order.cinema.chain}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-400 mt-0.5">{order.showtime.type || order.showtime.studio}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">DATE & TIME</p>
                  <p className="font-semibold text-slate-200">{new Date(order.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })} - {order.showtime.time} WIB</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">SEATS</p>
                  <div className="flex gap-2 mt-1">
                    {order.tickets.map(t => (
                      <span key={t.id} className="bg-brand-amber-500/20 border border-brand-amber-400 text-brand-amber-300 font-mono text-sm font-bold px-2.5 py-1 rounded">
                        {t.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {order.snacks && order.snacks.length > 0 && (
                <div className="mb-6 pt-4 border-t border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">SNACK PICKUP VOUCHER:</p>
                  <ul className="text-sm text-slate-300 list-disc list-inside">
                    {order.snacks.map((snack, idx) => (
                      <li key={idx}>{snack.quantity}x {snack.name} ({snack.size})</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-800 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white p-1.5 rounded">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CINETIX-TICKET" alt="QR" className="w-full h-full" />
                  </div>
                  <div className="text-xs text-slate-400">
                    <p>Present this QR Code to the cinema usher</p>
                    <p>at Studio Entrance or F&B Counter.</p>
                    <p className="mt-2 font-mono tracking-widest text-slate-300">{order.id.replace('TX-', '')}-8192</p>
                  </div>
                </div>
                <button onClick={() => window.print()} className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                  Download / Print
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
