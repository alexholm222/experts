import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadPage: true,
    loadManager: true,
    loadClient: true,
};

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,

    reducers: {
        
        setLoadPage(state, action) {
            state.loadPage = action.payload;
        },

        setLoadManager(state, action) {
            state.loadManager = action.payload;
        },

        setLoadClient(state, action) {
            state.loadClient = action.payload;
        },
    },
});

export const {
    setLoadPage,
    setLoadManager,
    setLoadClient
} = AppSlice.actions;

export default AppSlice.reducer;
