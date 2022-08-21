import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    offers: [],
    loading: false,
}


export const getAllOffer = createAsyncThunk('offer/getAllOffer', async () => {
    try {
        const { data } = await axios.get('/offers')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removeOffer = createAsyncThunk('offer/removeOffer', async (id) => {
    try {
        const { data } = await axios.delete(`offers/${id}`, id)
        return data
    } catch (error) { console.log(error)}
})


export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {},
    extraReducers: {

        //Get all posts
        [getAllOffer.pending]: (state) => {
            state.loading = true
        },
        [getAllOffer.fulfilled]: (state, action) => {
            state.loading = false
            state.offers = action.payload.offers
        },
        [getAllOffer.rejected]: (state) => {
            state.loading = false
        },

        //Delete post
        [removeOffer.pending]: (state) => {
            state.loading = true
        },
        [removeOffer.fulfilled]: (state, action) => {
            state.loading = false
            state.offers = state.offers.filter(
                (offer) => offer._id !== action.payload._id,
            )
        },
        [removeOffer.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default offerSlice.reducer