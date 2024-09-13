import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import socialSlice from './socialSlice';

const store = configureStore({
    reducer:{
        auth: authSlice,
        post: postSlice,
        social: socialSlice,
    }
})

export default store;