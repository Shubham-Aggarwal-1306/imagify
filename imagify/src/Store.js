import {configureStore} from '@reduxjs/toolkit';
import {userReducer } from './Reducers/User';
import { postReducer } from './Reducers/Post';

const store = configureStore({
    reducer: {
        user: userReducer,
        post : postReducer,
    },
});

export default store;