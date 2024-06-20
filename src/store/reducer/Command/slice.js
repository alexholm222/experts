import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    command: 'get_work_status',
    message: '',
    callStatus: '',
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

        setCallStatus(state, action) {
            state.callStatus = action.payload;
        },
    },
});

export const {
    setCommand,
    setMessage,
    setCallStatus
} = CommandSlice.actions;

export default CommandSlice.reducer;
