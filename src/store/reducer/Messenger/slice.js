import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: {},
    messageStatus: {},
    notification: {},
    notifications: [],
};

const MessengerSlice = createSlice({
    name: 'MessengerSlice',
    initialState,

    reducers: {
        setMessageMessanger(state, actions) {
            state.message = actions.payload;
        },

        setNotification(state, actions) {
            state.notification = actions.payload;
        },

        setNotifications(state, actions) {
            state.notifications = [...state.notifications, actions.payload];
        },

        deleteNotifications(state, action) {
            state.notifications = [...state.notifications.filter(el => el.client.id !== action.payload)];
        },

        setMessageStatus(state, actions) {
            state.messageStatus = actions.payload;
        },
    },
});

export const {
    setMessageMessanger,
    setNotification,
    setNotifications,
    setMessageStatus,
    deleteNotifications
} = MessengerSlice.actions;

export default MessengerSlice.reducer;
