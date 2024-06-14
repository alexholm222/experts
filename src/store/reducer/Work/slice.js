import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cities: [],
    road: [],
    comments: [],
    commentsForSend: {},
    dialog: '',
    next_connect: '0000-00-00',
    last_connect: '0000-00-00',
    zoom_status: -1,
    zoom_date: '0000-00-00',
};

const WorkSlice = createSlice({
    name: 'WorkSlice',
    initialState,

    reducers: {
        setCities(state, action) {
            state.cities = action.payload;
        },

        setRoad(state, action) {
            state.road = action.payload;
        },

        setComments(state, action) {
            state.comments = action.payload;
        },

        addComment(state, action) {
            state.comments = [action.payload, ...state.comments]
        },
    
        replaceComment(state, action) {
            state.comments = [action.payload, ...state.comments.slice(1)]
        },

        setCommentsForSend(state, action) {
            state.commentsForSend = action.payload;
        },

        setDialog(state, action) {
            state.dialog = action.payload;
        },

        setNextConnect(state, action) {
            state.next_connect = action.payload;
        },

        setZoomStatus(state, action) {
            state.zoom_status = action.payload;
        },

        setZoomConnect(state, action) {
            state.zoom_date = action.payload;
        },

        setLastConnect(state, action) {
            state.last_connect = action.payload;
        },


    },
});

export const {
    setCities,
    setRoad,
    setComments,
    setDialog,
    setNextConnect,
    setZoomStatus,
    setZoomConnect,
    setLastConnect,
    addComment,
    replaceComment,
    setCommentsForSend,
} = WorkSlice.actions;

export default WorkSlice.reducer;
