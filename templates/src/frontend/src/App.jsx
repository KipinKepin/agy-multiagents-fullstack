import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import MyTickets from './pages/MyTickets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="seats" element={<SeatSelection />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-tickets" element={<MyTickets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
