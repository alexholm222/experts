import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    today: [],
    new: [],
    no_task: [],
    archive: [],
    plan_meeting: [],
    zoom: [],
    anketa: [],
    contract: [],
    prepaid: [],
    favorite: [],
    loadToday: true,
    loadNew: true,
    loadNoTask: true,
    loadArchive: true,
    loadPlanMeeting: true,
    loadZoom: true,
    loadAnketa: true,
    loadContract: true,
    loadPrepaid: true,
    loadFavorite: true,
};

const MyClientsSlice = createSlice({
    name: 'MyClientsSlice',
    initialState,

    reducers: {
        setClientsToday(state, action) {
            state.today = action.payload/* [...state.today, ...action.payload] */;
        },

        setClientsNew(state, action) {
            state.new = action.payload /* [...state.new, ...action.payload] */;
        },

        setClientsNoTask(state, action) {
            state.no_task = action.payload /* [...state.no_task, ...action.payload] */;
        },

        setClientsArchive(state, action) {
            state.archive = action.payload /* [...state.archive, ...action.payload] */;
        },

        setPlanMeeting(state, action) {
            state.plan_meeting = action.payload /* [...state.plan_meeting, ...action.payload] */;
        },

        setZoom(state, action) {
            state.zoom = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setAnketa(state, action) {
            state.anketa = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setContract(state, action) {
            state.contract = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setPrepaid(state, action) {
            state.prepaid = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setFavorite(state, action) {
            state.favorite = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setFavorite(state, action) {
            state.favorite = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setAddFavorite(state, action) {
            state.favorite = [...state.favorite, action.payload] /* [...state.zoom, ...action.payload] */;
        },

        setRemoveFavorite(state, action) {
            state.favorite = [...state.favorite].filter(el => el.id !== action.payload.id)/* [...state.zoom, ...action.payload] */;
        },

        setLoadToday(state) {
            state.loadToday = false;
        },

        setLoadNew(state) {
            state.loadNew = false;
        },

        setLoadNoTask(state) {
            state.loadNoTask = false;
        },

        setLoadArchive(state) {
            state.loadArchive = false;
        },

        setLoadPlanMeeting(state) {
            state.loadPlanMeeting = false;
        },

        setLoadZoom(state) {
            state.loadZoom = false;
        },

        setLoadAnketa(state) {
            state.loadAnketa = false;
        },

        setLoadContract(state) {
            state.loadContract = false;
        },

        setLoadPrepaid(state) {
            state.loadPrepaid = false;
        },

        setLoadFavorite(state) {
            state.loadFavorite = false;
        }
    },
});

export const {
    setClientsToday,
    setLoadNew,
    setClientsNew,
    setClientsNoTask,
    setClientsArchive,
    setPlanMeeting,
    setZoom,
    setAnketa,
    setContract,
    setPrepaid,
    setFavorite,
    setLoadToday,
    setLoadNoTask,
    setLoadArchive,
    setLoadPlanMeeting,
    setLoadZoom,
    setLoadAnketa,
    setLoadContract,
    setLoadPrepaid,
    setLoadFavorite,
    setAddFavorite,
    setRemoveFavorite

} = MyClientsSlice.actions;

export default MyClientsSlice.reducer;
