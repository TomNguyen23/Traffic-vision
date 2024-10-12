import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isFetching: false,
    error: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        loginStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess(state, action) {
            state.isFetching = false;
            state.user = action.payload;
            state.error = false;
        },
        loginFailure(state) {
            state.isFetching = false;
            state.error = true;
        },

        logoutSuccess(state) {
            state.user = null;
            state.isFetching = false;
            state.error = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;