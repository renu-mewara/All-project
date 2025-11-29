import { configureStore, createSlice } from '@reduxjs/toolkit'
import cartslice from './cartslice'
import loginSlice  from './loginslice'


export const store = configureStore({
  reducer: {
    cart  : cartslice,
    login : loginSlice
  },
})