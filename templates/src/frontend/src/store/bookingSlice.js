import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedArea: 'Jakarta',
  selectedCinema: 'c1',
  selectedMovie: null,
  selectedShowtime: null,
  selectedSeats: [],
  bookingHistory: JSON.parse(localStorage.getItem('cinetix_orders')) || [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
      state.selectedCinema = null;
      state.selectedMovie = null;
      state.selectedShowtime = null;
      state.selectedSeats = [];
    },
    setCinema: (state, action) => {
      state.selectedCinema = action.payload;
    },
    setMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setShowtime: (state, action) => {
      state.selectedShowtime = action.payload;
      state.selectedSeats = [];
    },
    toggleSeat: (state, action) => {
      const seatId = action.payload.id;
      const existingIndex = state.selectedSeats.findIndex(s => s.id === seatId);
      if (existingIndex >= 0) {
        state.selectedSeats.splice(existingIndex, 1);
      } else {
        state.selectedSeats.push(action.payload);
      }
    },
    clearSeats: (state) => {
      state.selectedSeats = [];
    },
    addOrderToHistory: (state, action) => {
      state.bookingHistory.push(action.payload);
      localStorage.setItem('cinetix_orders', JSON.stringify(state.bookingHistory));
    }
  },
});

export const { setSelectedArea, setCinema, setMovie, setShowtime, toggleSeat, clearSeats, addOrderToHistory } = bookingSlice.actions;
export default bookingSlice.reducer;
