import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSeat } from '../store/bookingSlice';
import { addSnack, updateSnackQuantity, setTickets } from '../store/cartSlice';
import { api } from '../services/api';

const SEATS = [
  { id: 'A1', type: 'regular', status: 'available', price: 50000 }, { id: 'A2', type: 'regular', status: 'available', price: 50000 }, { id: 'A3', type: 'regular', status: 'available', price: 50000 }, { id: 'A4', type: 'regular', status: 'available', price: 50000 },
  { id: 'A5', type: 'regular', status: 'available', price: 50000 }, { id: 'A6', type: 'regular', status: 'available', price: 50000 }, { id: 'A7', type: 'regular', status: 'available', price: 50000 }, { id: 'A8', type: 'regular', status: 'available', price: 50000 },
  { id: 'C1', type: 'vip', status: 'available', price: 75000 }, { id: 'C2', type: 'vip', status: 'available', price: 75000 }, { id: 'C3', type: 'vip', status: 'available', price: 75000 }, { id: 'C4', type: 'vip', status: 'available', price: 75000 },
  { id: 'C5', type: 'vip', status: 'available', price: 75000 }, { id: 'C6', type: 'vip', status: 'available', price: 75000 }, { id: 'C7', type: 'vip', status: 'sold', price: 75000 }, { id: 'C8', type: 'vip', status: 'sold', price: 75000 },
  { id: 'E1', type: 'couple', status: 'available', price: 140000 }, { id: 'E2', type: 'couple', status: 'available', price: 140000 }, { id: 'E3', type: 'couple', status: 'available', price: 140000 }
];

const SeatSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedMovie, selectedCinema, selectedShowtime, selectedSeats } = useSelector(state => state.booking);
  const cartItems = useSelector(state => state.cart.items);

  const [activeTab, setActiveTab] = useState('seats');
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    const fetchSnacks = async () => {
      const snacksData = await api.getSnacks();
      setSnacks(snacksData || []);
    };
    fetchSnacks();
  }, []);

  if (!selectedShowtime || !selectedMovie) {
    return <div className="p-8 text-center text-white mt-16"><p>Belum ada jadwal yang dipilih.</p></div>;
  }

  const handleSeatClick = (seat) => {
    if (seat.status === 'sold') return;
    dispatch(toggleSeat(seat));
  };

  const isSelected = (seatId) => selectedSeats.some(s => s.id === seatId);

  const totalSeatsPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const totalSnacksPrice = cartItems.reduce((acc, s) => acc + (s.price * s.quantity), 0);

  const proceedToCheckout = () => {
    dispatch(setTickets(selectedSeats));
    navigate('/checkout');
  };

  const renderSeat = (seat) => {
    const selected = isSelected(seat.id);
    let baseClass = "flex items-center justify-center font-mono text-xs font-bold transition-all ";
    
    if (seat.type === 'regular') {
      baseClass += "w-9 h-9 sm:w-10 sm:h-10 rounded-md border ";
      if (seat.status === 'sold') baseClass += "bg-slate-900/80 border-slate-800 text-slate-600 cursor-not-allowed opacity-60";
      else if (selected) baseClass += "bg-brand-amber-500 border-brand-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]";
      else baseClass += "bg-slate-800 border-slate-600 text-slate-200 hover:border-brand-amber-400 hover:bg-slate-700 cursor-pointer";
    } else if (seat.type === 'vip') {
      baseClass += "w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-2 ";
      if (seat.status === 'sold') baseClass += "bg-slate-900/80 border-slate-800 text-slate-600 cursor-not-allowed opacity-60";
      else if (selected) baseClass += "bg-brand-amber-500 border-brand-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]";
      else baseClass += "bg-amber-950/40 border-brand-amber-600 text-amber-200 hover:border-brand-amber-400 hover:bg-amber-900/60 cursor-pointer";
    } else if (seat.type === 'couple') {
      baseClass += "w-20 sm:w-24 h-10 rounded-xl border-2 ";
      if (seat.status === 'sold') baseClass += "bg-slate-900/80 border-slate-800 text-slate-600 cursor-not-allowed opacity-60";
      else if (selected) baseClass += "bg-brand-amber-500 border-brand-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]";
      else baseClass += "bg-rose-950/40 border-brand-crimson-600 text-rose-200 hover:border-brand-crimson-400 hover:bg-rose-900/60 cursor-pointer";
    }

    return (
      <button key={seat.id} className={baseClass} onClick={() => handleSeatClick(seat)} disabled={seat.status === 'sold'}>
        {seat.id}
      </button>
    );
  };

  return (
    <div className="pb-24 mt-16">
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{selectedMovie?.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 justify-center md:justify-start">
              <span className="font-semibold text-brand-amber-400">{selectedCinema?.name}</span>
              <span>•</span>
              <span>{selectedCinema?.chain}</span>
              <span>•</span>
              <span>{selectedShowtime?.type}</span>
            </div>
          </div>
          <div className="text-center md:text-right bg-slate-800 px-6 py-2 rounded-lg border border-slate-700">
            <div className="text-sm text-slate-400">Jadwal Tayang</div>
            <div className="text-xl font-bold text-white">{selectedShowtime?.date} <span className="text-brand-amber-400">{selectedShowtime?.time}</span></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6 border-b border-slate-800 pb-2">
          <button onClick={() => setActiveTab('seats')} className={`px-4 py-2 font-bold ${activeTab === 'seats' ? 'text-brand-amber-500 border-b-2 border-brand-amber-500' : 'text-slate-400 hover:text-white'}`}>Pilih Kursi</button>
          <button onClick={() => setActiveTab('snacks')} className={`px-4 py-2 font-bold ${activeTab === 'snacks' ? 'text-brand-amber-500 border-b-2 border-brand-amber-500' : 'text-slate-400 hover:text-white'}`}>F&B (Camilan)</button>
        </div>

        {activeTab === 'seats' && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[600px] flex flex-col items-center">
              <div className="w-4/5 mx-auto h-3 border-t-4 border-brand-amber-400/90 rounded-t-[100%] shadow-[0_-12px_28px_rgba(245,158,11,0.4)] relative mb-12">
                <p className="text-[11px] text-brand-amber-300/80 font-bold tracking-[0.3em] uppercase text-center mt-3">LAYAR BIOSKOP</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-16 justify-center">
                  <div className="flex gap-2">{SEATS.filter(s => s.id.startsWith('A') && parseInt(s.id[1]) <= 4).map(renderSeat)}</div>
                  <div className="flex gap-2">{SEATS.filter(s => s.id.startsWith('A') && parseInt(s.id[1]) > 4).map(renderSeat)}</div>
                </div>
                <div className="flex gap-16 justify-center">
                  <div className="flex gap-2">{SEATS.filter(s => s.id.startsWith('C') && parseInt(s.id[1]) <= 4).map(renderSeat)}</div>
                  <div className="flex gap-2">{SEATS.filter(s => s.id.startsWith('C') && parseInt(s.id[1]) > 4).map(renderSeat)}</div>
                </div>
                <div className="flex gap-16 justify-center mt-8">
                  <div className="flex gap-4">{SEATS.filter(s => s.id.startsWith('E')).map(renderSeat)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'snacks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snacks.map(snack => {
              const itemInCart = cartItems.find(i => i.id === snack.id);
              const quantity = itemInCart ? itemInCart.quantity : 0;
              return (
                <div key={snack.id} className="bg-slate-800/70 border border-white/5 hover:border-brand-amber-500/40 rounded-xl p-4 flex flex-col">
                  <div className="flex gap-4">
                    <img src={snack.image} alt={snack.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-100">{snack.name}</h4>
                      <p className="text-xs text-slate-400 mb-2">Size: {snack.size}</p>
                      <p className="text-brand-amber-400 font-bold">Rp {snack.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end items-center gap-4">
                    {quantity > 0 ? (
                      <div className="inline-flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 gap-2">
                        <button onClick={() => dispatch(updateSnackQuantity({ id: snack.id, size: snack.size, quantity: quantity - 1 }))} className="w-7 h-7 flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300">-</button>
                        <span className="w-6 text-center text-sm font-bold text-brand-amber-400">{quantity}</span>
                        <button onClick={() => dispatch(updateSnackQuantity({ id: snack.id, size: snack.size, quantity: quantity + 1 }))} className="w-7 h-7 flex items-center justify-center rounded-md bg-brand-amber-500 text-slate-950 font-bold">+</button>
                      </div>
                    ) : (
                      <button onClick={() => dispatch(addSnack({ ...snack, quantity: 1 }))} className="bg-brand-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm hover:bg-brand-amber-400">
                        + Tambah
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/80 p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <span className="text-slate-400">Terpilih: </span>
            <strong className="text-brand-amber-400">{selectedSeats.length} Kursi</strong>
            {cartItems.length > 0 && <span className="text-slate-400"> | {cartItems.reduce((a,c)=>a+c.quantity,0)} F&B</span>}
            <div className="text-lg font-bold text-white mt-1">Total: Rp {(totalSeatsPrice + totalSnacksPrice).toLocaleString('id-ID')}</div>
          </div>
          <button 
            onClick={proceedToCheckout}
            disabled={selectedSeats.length === 0}
            className="w-full sm:w-auto bg-brand-amber-500 text-slate-950 font-bold px-8 py-3 rounded-lg hover:bg-brand-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
