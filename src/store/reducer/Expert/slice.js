import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expert: JSON.parse(localStorage.getItem('expert')) || {}
};

const ExpertSlice = createSlice({
    name: 'ExpertSlice',
    initialState,

    reducers: {
        setExpert(state, actions) {
            state.expert = actions.payload;
        },
    },
});

export const {
    setExpert,
} = ExpertSlice.actions;

export default ExpertSlice.reducer;
