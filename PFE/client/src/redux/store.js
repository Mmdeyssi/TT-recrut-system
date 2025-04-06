import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobSlice from "./JobSlice"
import applicationSlice from "./applicationSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import Applicants from "@/Recruiter/viewApplications";
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers({
    job:jobSlice,
    application:applicationSlice
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})