import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allPosts: [],
    userPosts: [],
    recentPosts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getAllPosts: (state, action) => {
            state.allPosts = [...action.payload.allPosts];
        },
        getUserPosts: (state, action) => {
            state.userPosts = [...action.payload.userPosts];
        },
        getRecentPosts: (state, action)=> {
            state.recentPosts = [...action.payload.recentPosts]
        }
    }
})

export const { getAllPosts, getUserPosts, getRecentPosts } = postSlice.actions;

export default postSlice.reducer;