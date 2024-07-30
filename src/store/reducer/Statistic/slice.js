import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statisticToday: {},
};

const StatisticSlice = createSlice({
    name: 'StatisticSlice',
    initialState,

    reducers: {
        setStatisticToday(state, actions) {
            state.statisticToday = actions.payload;
        },
    },
});

export const {
    setStatisticToday,
} = StatisticSlice.actions;

export default StatisticSlice.reducer;
