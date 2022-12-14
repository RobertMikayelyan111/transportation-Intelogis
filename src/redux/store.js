import { configureStore } from "@reduxjs/toolkit";
import adressesReducer from "./reducers/adressesSlice";
import createSagaMiddleware from "redux-saga";
import sagaWatcher from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    adresses: adressesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagaWatcher);
