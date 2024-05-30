import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppSlice from './reducer/App/slice';
import ClientSlice from './reducer/Client/slice';
import WidgetSlice from './reducer/Widget/slice';
import MyClientsSlice from './reducer/MyClients/slice';
import UpdaterSlice from './reducer/Updater/slice';

export const rootReducer = combineReducers({
  AppSlice,
  ClientSlice,
  WidgetSlice,
  MyClientsSlice,
  UpdaterSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
