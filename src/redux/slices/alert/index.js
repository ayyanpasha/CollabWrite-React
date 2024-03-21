import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    initialState: {
        message: "",
        type: null
    },
    name: 'alert',
    reducers: {
        alert: (state, action) => {
            state.type = action.payload.type;
            if (typeof action.payload === 'string') state.message = action.payload.message;
            else state.message = JSON.stringify(action.payload.message);
        }
    }
});

export const alertAction = alertSlice.actions;

export default alertSlice.reducer;