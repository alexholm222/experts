import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offices: [],
    companies: [],
};

const PartnersSlice = createSlice({
    name: 'PartnersSlice',
    initialState,

    reducers: {
        setOffices(state, action) {
            state.offices = action.payload;
        },

        setCompanies(state, action) {
            state.companies = action.payload;
        },
    },
});

export const {
    setOffices,
    setCompanies
} = PartnersSlice.actions;

export default PartnersSlice.reducer;
