import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    planer: {},
    planerLoad: true,
};

const PlanerSlice = createSlice({
    name: 'PlanerSlice',
    initialState,

    reducers: {
        setPlaner(state, action) {
            state.planer = action.payload;
        },

        setPlanerLoad(state, action) {
            state.planerLoad = action.payload;
        },
    },
});

export const {
    setPlaner,
    setPlanerLoad
} = PlanerSlice.actions;

export default PlanerSlice.reducer;
