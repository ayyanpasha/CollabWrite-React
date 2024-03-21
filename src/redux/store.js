import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication/index";
import alertReducer from './slices/alert/index'

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        alert: alertReducer
    }
});

export default store;