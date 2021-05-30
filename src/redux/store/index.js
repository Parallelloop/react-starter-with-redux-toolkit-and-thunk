import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStore } from 'redux';
import createFilter from 'redux-persist-transform-filter';
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import auth from "../reducers/auth";
import thunk from 'redux-thunk'

// fields you want to whitelist
const testTransform = createFilter('test', ['field 1','field 2' ]);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "test"],
  //whitelist only selected fields from
  transforms: [testTransform],
};
const reducers = combineReducers({
  auth: auth,
  // test: test,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});
