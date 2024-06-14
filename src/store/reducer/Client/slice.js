import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonHiden: false,
    client_numbers: [],
    client_main_number: '',
    client_id: JSON.parse(localStorage.getItem('client_id')) || '',
    client_name: '',
    client_surname: '',
    client_city: '',
    favorite: 0,
    clientUpdate: 0,
    menuIdUpdate: 0,
    stage: 'bp'
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

        setMenuIdUpdate(state, actions) {
            state.menuIdUpdate = actions.payload;
        },

        setStage(state, actions) {
            state.stage = actions.payload;
        },

    },
});

export const {
    setTelCount,
    setButtonHiden,
    setNumbers,
    setNumbersDefault,
    setClientMain,
    setClientId,
    setClientName,
    setClientSurname,
    setClientCity,
    setFavorite,
    setClientUpdate,
    setMenuIdUpdate,
    setStage
} = ClientSlice.actions;

export default ClientSlice.reducer;
