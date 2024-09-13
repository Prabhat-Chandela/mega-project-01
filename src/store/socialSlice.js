import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSocialPosts: [],
    userSocialPosts: []
}

const socialSlice = createSlice({
    name: "social",
    initialState,
    reducers: {
        getAllSocialPosts: (state, action) => {
            state.allSocialPosts = [...action.payload.allSocialPosts];
        },
        getUserSocialPosts: (state, action) => {
            state.userSocialPosts = [...action.payload.userSocialPosts];
        }
    }
})

export const {getAllSocialPosts, getUserSocialPosts} = socialSlice.actions;

export default socialSlice.reducer;