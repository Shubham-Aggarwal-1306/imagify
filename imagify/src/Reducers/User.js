import { createReducer } from "@reduxjs/toolkit";

const initialState = {
}

export const userReducer = createReducer(initialState, (builder) => {

    builder
        .addCase("LoginRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoginFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("LoginSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        .addCase("RegisterRequest", (state) => {
            state.loading = true;
        })
        .addCase("RegisterFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("RegisterSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        .addCase("LogoutRequest", (state) => {
            state.loading = true;
        })
        .addCase("LogoutFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("LogoutSuccess", (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase("ClearUserError", (state) => {
            state.error = null;
        })
})