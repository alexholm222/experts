import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadPage: true,
    loadManager: true,
    loadClient: true,
    disabledMyClients: false,
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

        setDisabledMyClients(state, action) {
            state.disabledMyClients = action.payload;
        },
    },
});

export const {
    setLoadPage,
    setLoadManager,
    setLoadClient,
    setDisabledMyClients
} = AppSlice.actions;

export default AppSlice.reducer;
