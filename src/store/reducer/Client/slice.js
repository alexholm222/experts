import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonHiden: false,
    numbers: ['9213777267'],
};

const ClientSlice = createSlice({
    name: 'ClientSlice',
    initialState,

    reducers: {
        setTelCount(state) {
            state.telCount = state.telCount + 1;
        },

        setButtonHiden(state, action) {
            state.buttonHiden = action.payload;
        },

        setNumbers(state, action) {
            state.numbers = [...state.numbers, action.payload];
        },

        setNumbersDefault(state, action) {
            state.numbers = action.payload;
        }
    },
});

export const {
    setTelCount,
    setButtonHiden,
    setNumbers,
    setNumbersDefault
} = ClientSlice.actions;

export default ClientSlice.reducer;
