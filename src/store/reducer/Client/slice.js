import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonHiden: false,
    client_numbers: [],
    client_main_number: '',
    client_id: '',
    client_name: '',
    client_surname: '',
    client_city: '',
    favorite: 0,
    clientUpdate: 0,
    menuIdUpdate: 0,
    stage: 'bp',
    anketaAcceptDate: '0000-00-00',
    talkTime: 0,
    missCall: false,
    callMe: false,
    clientStatus: 1,
    dayWithoutMove: 0,
};
/* stages =[bp, viewBp (ознакомился с БП, road status == finished), ReqZoom (запросил zoom последний лог type == ReqZoom), setZoom (записался на Zoom road status == finished), 
finishZoom (road status == finished)] , noZoom (зумм не состоялся setZoom road status == finished берем последний лог и смотрим что время лога меньше чем текущего времени на пол часа ), 
sendAnketa(смотрим если последний лог type == SendForm), finishAnketa(road status == finished), rejectAnketa]
 */

const ClientSlice = createSlice({
    name: 'ClientSlice',
    initialState,

    reducers: {
        setTelCount(state) {
            state.telCount = state.telCount + 1;
        },

        setButtonHiden(state, action) {
            state.buttonHiden = action.payload;
        },

        setNumbers(state, action) {
            state.client_numbers = [...state.client_numbers, action.payload];
        },

        setDeleteNumber(state, action) {
            state.client_numbers = [...state.client_numbers.filter(el => el !== action.payload)];
        },

        setNumbersDefault(state, action) {
            state.client_numbers = action.payload;
        },

        setClientMain(state, action) {
            state.client_main_number = action.payload;
        },

        setClientId(state, actions) {
            state.client_id = actions.payload;
        },

        setClientName(state, actions) {
            state.client_name = actions.payload;
        },

        setClientSurname(state, actions) {
            state.client_surname = actions.payload;
        },

        setClientCity(state, actions) {
            state.client_city = actions.payload;
        },

        setFavorite(state, actions) {
            state.favorite = actions.payload;
        },

        setClientUpdate(state, actions) {
            state.clientUpdate = actions.payload;
        },

        setMenuIdUpdate(state) {
            state.menuIdUpdate = state.menuIdUpdate + 1;
        },

        setStage(state, actions) {
            state.stage = actions.payload; 
        },

        setAnketaAcceptDate(state, actions) {
            state.anketaAcceptDate = actions.payload;
        },

        setTalkTime(state, actions) {
            state.talkTime = actions.payload;
        },

        setMissCall(state, action) {
            state.missCall = action.payload;
        },

        setCallMe(state, action) {
            state.callMe = action.payload;
        },

        setClientStatus(state, action) {
            state.clientStatus = action.payload;
        },
        
        setDayWithoutMove(state, action) {
            state.dayWithoutMove = action.payload;
        },
        
    },
});

export const {
    setTelCount,
    setButtonHiden,
    setNumbers,
    setDeleteNumber,
    setNumbersDefault,
    setClientMain,
    setClientId,
    setClientName,
    setClientSurname,
    setClientCity,
    setFavorite,
    setClientUpdate,
    setMenuIdUpdate,
    setStage,
    setAnketaAcceptDate,
    setTalkTime,
    setMissCall,
    setCallMe,
    setClientStatus,
    setDayWithoutMove
} = ClientSlice.actions;

export default ClientSlice.reducer;
