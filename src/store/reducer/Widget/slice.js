import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    height: 316
};

const WidgetSlice = createSlice({
    name: 'WidgetSlice',
    initialState,

    reducers: {
        setHeight(state, actions) {
            state.height = actions.payload;
        },
    },
});

export const {
    setHeight,
} = WidgetSlice.actions;

export default WidgetSlice.reducer;
