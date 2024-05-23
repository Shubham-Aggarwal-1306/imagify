import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    nearbyPosts: [],
    post: {},
}

export const postReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GetAllPostsRequest", (state) => {
            state.loading = true;
        })
        .addCase("GetAllPostsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("GetAllPostsSuccess", (state, action) => {
            state.loading = false;
            state.allPosts = action.payload;
            state.error = null;
        })
        .addCase("GetPostRequest", (state) => {
            state.loading = true;
        })
        .addCase("GetPostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("GetPostSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = null;
        })
        .addCase("CreatePostRequest", (state) => {
            state.loading = true;
        })
        .addCase("CreatePostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CreatePostSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = null;
        })
        .addCase("UpdatePostRequest", (state) => {
            state.loading = true;
        })
        .addCase("UpdatePostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("UpdatePostSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = null;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
});