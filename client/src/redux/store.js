import { configureStore, combineReducers } from "@reduxjs/toolkit";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import appReducer from "./appRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, app: appReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
