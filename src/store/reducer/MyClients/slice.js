import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    today: [],
    todayNum: 0,
    todayNextPage: '',
    new: [],
    newNum: 0,
    newNextPage: '',
    noTask: [],
    noTaskNum: 0,
    noTaskNextPage: '',
    archive: [],
    plan_meeting: [],
    planNum: 0,
    planNextPage: '',
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
            state.today = action.payload;
        },
        setClientsTodayAdd(state, action) {
            state.today = [...state.today, ...action.payload];
        },

        setClientsNum(state, action) {
            state.todayNum = action.payload;
        },

        setTodayNextPage(state, action) {
            state.todayNextPage = action.payload;
        },

        setClientsNew(state, action) {
            state.new = action.payload;
        },

        setClientsNewAdd(state, action) {
            state.new = [...state.new, ...action.payload];
        },

        setClientsNewNum(state, action) {
            state.newNum = action.payload;
        },

        setNewNextPage(state, action) {
            state.newNextPage = action.payload;
        },

        setClientsNoTask(state, action) {
            state.noTask = action.payload;
        },

        setClientsNoTaskAdd(state, action) {
            state.noTask = [...state.noTask, ...action.payload];
        },

        setClientsNoTaskNum(state, action) {
            state.noTaskNum = action.payload;
        }, 

        setNoTaskNextPage(state, action) {
            state.noTaskNextPage = action.payload;
        },

        setClientsArchive(state, action) {
            state.archive = action.payload /* [...state.archive, ...action.payload] */;
        },

        setPlanMeeting(state, action) {
            state.plan_meeting = action.payload;
        },

        setPlanMeetingAdd(state, action) {
            state.plan_meeting = [...state.plan_meeting, ...action.payload];
        },

        setPlanNum(state, action) {
            state.planNum = action.payload;
        },

        setPlanNextPage(state, action) {
            state.planNextPage = action.payload;
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
        },
    },
});

export const {
    setClientsToday,
    setClientsTodayAdd,
    setClientsNum,
    setClientsNewAdd,
    setTodayNextPage,
    setLoadNew,
    setClientsNew,
    setClientsNewNum,
    setNewNextPage,
    setClientsNoTask,
    setClientsNoTaskAdd,
    setClientsNoTaskNum,
    setNoTaskNextPage,
    setClientsArchive,
    setPlanMeeting,
    setPlanMeetingAdd,
    setPlanNum,
    setPlanNextPage,
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
    setRemoveFavorite,

} = MyClientsSlice.actions;

export default MyClientsSlice.reducer;
