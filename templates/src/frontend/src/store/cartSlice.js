import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of snacks
  tickets: [], // Array of selected tickets/seats
  promoCode: null,
  promoDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addSnack: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateSnackQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existing = state.items.find(item => item.id === id && item.size === size);
      if (existing) {
        existing.quantity = quantity;
        if (existing.quantity <= 0) {
          state.items = state.items.filter(item => !(item.id === id && item.size === size));
        }
      }
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    applyPromo: (state, action) => {
      state.promoCode = action.payload.code;
      state.promoDiscount = action.payload.discount;
    },
    removePromo: (state) => {
      state.promoCode = null;
      state.promoDiscount = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.tickets = [];
      state.promoCode = null;
      state.promoDiscount = 0;
    }
  },
});

export const { addSnack, updateSnackQuantity, setTickets, applyPromo, removePromo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
