import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offices: [],
    companies: [],
    companiesNum: [],
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

        setCompaniesNum(state, action) {
            state.companiesNum = action.payload;
        },
    },
});

export const {
    setOffices,
    setCompanies,
    setCompaniesNum
} = PartnersSlice.actions;

export default PartnersSlice.reducer;
