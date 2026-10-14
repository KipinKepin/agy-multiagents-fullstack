import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, applyPromo, removePromo } from '../store/cartSlice';
import { clearSeats, addOrderToHistory } from '../store/bookingSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedMovie, selectedShowtime, selectedCinema } = useSelector(state => state.booking);
  const { items: snacks, tickets, promoCode, promoDiscount } = useSelector(state => state.cart);
  const [promoInput, setPromoInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedMovie || tickets.length === 0) {
    return <div className="p-8 text-center mt-16 text-white"><p>Belum ada tiket di keranjang.</p></div>;
  }

  const subtotalSeats = tickets.reduce((acc, s) => acc + s.price, 0);
  const subtotalSnacks = snacks.reduce((acc, s) => acc + (s.price * s.quantity), 0);
  const subtotal = subtotalSeats + subtotalSnacks;
  
  const tax = subtotal * 0.11;
  const adminFee = 3000;
  
  const discountAmount = promoDiscount > 0 ? (subtotal * promoDiscount / 100) : 0;
  
  const total = subtotal + tax + adminFee - discountAmount;

  const handleApplyPromo = async () => {
    try {
      const result = await import('../services/api').then(m => m.api.validateVoucher(promoInput));
      if (result.valid) {
        dispatch(applyPromo({ code: promoInput, discount: result.discount }));
      } else {
        alert(result.message || 'Kode promo tidak valid!');
      }
    } catch (e) {
      alert('Gagal memvalidasi promo.');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = {
        id: 'TX-' + Math.floor(Math.random() * 100000000),
        date: new Date().toISOString(),
        movie: selectedMovie,
        showtime: selectedShowtime,
        cinema: selectedCinema,
        tickets,
        snacks,
        total,
      };
      dispatch(addOrderToHistory(order));
      dispatch(clearCart());
      dispatch(clearSeats());
      setIsProcessing(false);
      navigate('/my-tickets');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">CHECKOUT & PEMBAYARAN</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">1. RINCIAN TIKET</h3>
            <div className="flex gap-4">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-16 h-24 object-cover rounded" />
              <div>
                <h4 className="font-bold text-slate-100">{selectedMovie.title}</h4>
                <div className="text-sm text-slate-400 mt-1">
                  <span className="font-medium text-slate-200">{selectedCinema?.name || 'Bioskop'}</span>
                  {selectedCinema?.chain && (
                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      selectedCinema.chain === 'XXI' ? 'bg-amber-600/20 text-amber-500 border border-amber-600/30' :
                      selectedCinema.chain === 'CGV' ? 'bg-red-600/20 text-red-500 border border-red-600/30' :
                      'bg-blue-600/20 text-blue-500 border border-blue-600/30'
                    }`}>
                      {selectedCinema.chain}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400">{selectedShowtime?.studio_type || selectedShowtime?.studio} • {selectedShowtime?.time} WIB</p>
                <p className="text-sm text-brand-amber-400 mt-1">Kursi: {tickets.map(t => t.id).join(', ')}</p>
              </div>
            </div>
          </div>
          
          {snacks.length > 0 && (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">2. CAMILAN (F&B)</h3>
              <div className="space-y-3">
                {snacks.map(snack => (
                  <div key={`${snack.id}-${snack.size}`} className="flex justify-between text-sm">
                    <span className="text-slate-300">{snack.quantity}x {snack.name} ({snack.size})</span>
                    <span className="text-slate-100">Rp {(snack.price * snack.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">3. METODE PEMBAYARAN</h3>
            <div className="space-y-3">
              {['QRIS', 'E-Wallet', 'Virtual Account'].map(method => (
                <label key={method} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-brand-amber-400 transition-colors">
                  <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="text-brand-amber-500 focus:ring-brand-amber-500 bg-slate-900 border-slate-600" />
                  <span className="text-slate-200">{method}</span>
                </label>
              ))}
            </div>
            {paymentMethod === 'QRIS' && (
              <div className="mt-4 p-4 bg-slate-900 rounded-lg flex flex-col items-center justify-center border border-slate-700">
                <div className="w-48 h-48 bg-white p-2 rounded-lg mb-2">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CINETIX-MOCK-QR" alt="QR" className="w-full h-full" />
                </div>
                <p className="text-sm text-slate-400 text-center">Scan via Mobile Banking / E-Wallet apa saja</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-brand-amber-500/20 p-6 rounded-xl shadow-2xl sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">RINGKASAN BIAYA</h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Tiket ({tickets.length}x)</span>
                <span className="text-slate-100">Rp {subtotalSeats.toLocaleString('id-ID')}</span>
              </div>
              {snacks.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">F&B ({snacks.reduce((a,c)=>a+c.quantity,0)} Item)</span>
                  <span className="text-slate-100">Rp {subtotalSnacks.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-300">Subtotal</span>
                <span className="text-slate-100">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pajak PPN 11%</span>
                <span className="text-slate-100">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Biaya Admin</span>
                <span className="text-slate-100">Rp {adminFee.toLocaleString('id-ID')}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promo ({promoCode})</span>
                  <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoInput} 
                  onChange={e => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Kode Promo" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-brand-amber-400 outline-none"
                />
                <button onClick={handleApplyPromo} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Gunakan
                </button>
              </div>
              {promoCode && <p className="text-xs text-emerald-400 mt-2">✓ Voucher {promoCode} Berhasil Diterapkan!</p>}
            </div>

            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-slate-200 font-medium">TOTAL</span>
                <span className="text-2xl font-bold text-brand-amber-400">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-brand-amber-500 text-slate-950 font-bold py-3.5 rounded-lg hover:bg-brand-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                `BAYAR SEKARANG`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
