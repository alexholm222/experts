import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadPage: true,
    loadManager: true,
    loadClient: false,
    loadPartners: true,
    disabledMyClients: false,
    theme: JSON.parse(localStorage.getItem('theme')) || 'light',
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

        setLoadPartners(state, action) {
            state.loadPartners = action.payload;
        },

        setDisabledMyClients(state, action) {
            state.disabledMyClients = action.payload;
        },

        setTheme(state) {
            state.theme == 'light' ? state.theme = 'dark' : state.theme = 'light';
        }
    },
});

export const {
    setLoadPage,
    setLoadManager,
    setLoadClient,
    setLoadPartners,
    setDisabledMyClients,
    setTheme
} = AppSlice.actions;

export default AppSlice.reducer;
