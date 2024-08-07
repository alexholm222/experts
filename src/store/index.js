import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppSlice from './reducer/App/slice';
import ClientSlice from './reducer/Client/slice';
import WidgetSlice from './reducer/Widget/slice';
import MyClientsSlice from './reducer/MyClients/slice';
import UpdaterSlice from './reducer/Updater/slice';
import PlanerSlice from './reducer/Planer/slice';
import WorkSlice from './reducer/Work/slice'; 
import CommandSlice from './reducer/Command/slice'; 
import ExpertSlice from './reducer/Expert/slice';
import PartnersSlice from './reducer/Partners/slice';
import lkCalendarSlice from '../block/CalendarEvent/store/reducer/lk/calendar/slice';
import MessengerSlice from './reducer/Messenger/slice';
import StatisticSlice from './reducer/Statistic/slice';

export const rootReducer = combineReducers({
  AppSlice,
  ClientSlice,
  WidgetSlice,
  MyClientsSlice,
  UpdaterSlice,
  PlanerSlice,
  WorkSlice,
  CommandSlice,
  ExpertSlice,
  PartnersSlice,
  lkCalendarSlice,
  MessengerSlice,
  StatisticSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
