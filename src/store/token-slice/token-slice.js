import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState: {
        token: ""
    },
    reducers: {
        setToken: (currentSlice, action) => {
            currentSlice.token = action.payload
        }
    }
})

export const tokenReducer = tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;