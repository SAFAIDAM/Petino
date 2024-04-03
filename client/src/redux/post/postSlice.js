import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPosts(state, action) {
            state.posts = action.payload;
        },
        createPostSuccess(state, action) {
            return {
                ...state,
                posts: [...state.posts, action.payload.data]
            }
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
    },
});

export const { getPosts, createPostSuccess, deletePost } = postSlice.actions;

export default postSlice.reducer;
