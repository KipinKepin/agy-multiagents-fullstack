import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/authSlice';
import { setSelectedArea } from '../../store/bookingSlice';
import { Film, MapPin, Search, ShoppingCart, User, LogOut, Ticket, ChevronDown } from 'lucide-react';
import { AREAS } from '../../data/mockData';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const cartItems = useSelector(state => state.cart.items);
  const cartTickets = useSelector(state => state.cart.tickets);
  const selectedArea = useSelector(state => state.booking.selectedArea);
  const cartCount = cartItems.length + cartTickets.length;
  
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAreaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginDemo = () => {
    dispatch(login({ id: 'u1', name: 'Guest User', email: 'guest@cinetix.test' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-amber-400 to-brand-amber-600 flex items-center justify-center shadow-lg shadow-brand-amber-500/30 group-hover:shadow-brand-amber-500/50 transition-all">
              <Film className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">Cine<span className="text-brand-amber-400">Tix</span></span>
          </Link>

          <div className="hidden md:block relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsAreaOpen(!isAreaOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
            >
              <MapPin className="w-4 h-4 text-brand-amber-400" /> 
              {selectedArea || 'Pilih Area'} 
              <ChevronDown className="w-3 h-3" />
            </button>
            {isAreaOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                {AREAS.map(area => (
                  <button
                    key={area}
                    onClick={() => {
                      dispatch(setSelectedArea(area));
                      setIsAreaOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedArea === area ? 'text-brand-amber-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden lg:block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-brand-amber-400 focus:ring-1 focus:ring-brand-amber-400 transition-colors sm:text-sm"
            placeholder="Search movies..."
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/checkout" className="relative text-slate-300 hover:text-white transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-crimson-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 group relative">
              <div className="w-8 h-8 rounded-full bg-brand-amber-500/20 border border-brand-amber-400/40 flex items-center justify-center text-brand-amber-300 cursor-pointer font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-1">
                <Link to="/my-tickets" className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-amber-400 flex items-center gap-2">
                  <Ticket className="w-4 h-4" /> My Tickets
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-amber-400 flex items-center gap-2 text-left">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button onClick={handleLoginDemo} className="bg-transparent border border-slate-600 text-slate-100 hover:border-brand-amber-400 hover:text-brand-amber-400 rounded-lg px-4 py-2 text-sm transition-all font-medium">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
