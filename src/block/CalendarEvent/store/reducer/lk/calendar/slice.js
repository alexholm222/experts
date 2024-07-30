import { createSlice } from '@reduxjs/toolkit';

const monthToday = new Date().getMonth() + 1;
const date = new Date();

const options = {
	month: 'long',
};

const currentMonth = date.toLocaleDateString('ru-RU', options);

const initialState = {
	isModal: false,
	id: null,
	premium: false,
	type: 'all',
	currentMonth,
	month: monthToday,
};

const lkCalendarSlice = createSlice({
	name: 'lkCalendar',
	initialState,

	reducers: {
		setAddModal(state, action) {
			state.isModal = action.payload;
		},

		setAddId(state, action) {
			state.id = action.payload;
		},

		setAddPremium(state, action) {
			state.premium = action.payload;
		},

		setAddType(state, action) {
			state.type = action.payload;
		},

		setAddCurrentMonth(state, action) {
			state.currentMonth = action.payload;
		},

		setAddMonth(state, action) {
			state.month = action.payload;
		},
	},
});

export const {
	setAddModal,
	setAddId,
	setAddPremium,
	setAddType,
	setAddCurrentMonth,
	setAddMonth,
} = lkCalendarSlice.actions;

export default lkCalendarSlice.reducer;
