import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    allPosts: [],
    userPosts: []
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers: {
        getAllPosts: (state , action) => {
            state.allPosts = action.payload.allPosts ;
            
        },
        getUserPosts: (state) => {
            state.userPosts = action.payload.userPosts ;
        }
    }
})

export const {getAllPosts , getUserPosts} = postSlice.actions;

export default postSlice.reducer;