import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import postSlice from './features/post/postSlice';
import offerSlice from './features/offer/offerSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        offer: offerSlice
    },
})