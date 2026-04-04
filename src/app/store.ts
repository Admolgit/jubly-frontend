import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import vendorReducer from "../features/vendor/vendorSlice";
import availabilityReducer from '../features/availability/availabilitySlice';
import bookingReducer from '../features/booking/bookingSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import { api } from "./api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "vendor", "availability", "calendar"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  vendor: vendorReducer,
  availability: availabilityReducer,
  booking: bookingReducer,
  calendar: calendarReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
