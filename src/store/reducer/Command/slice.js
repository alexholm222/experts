import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    command: 'get_work_status',
    message: '',
};

const CommandSlice = createSlice({
    name: 'CommandSlice',
    initialState,

    reducers: {
        setCommand(state, action) {
            state.command = action.payload;
        },

        setMessage(state, action) {
            state.message = action.payload;
        },
    },
});

export const {
    setCommand,
    setMessage
} = CommandSlice.actions;

export default CommandSlice.reducer;
