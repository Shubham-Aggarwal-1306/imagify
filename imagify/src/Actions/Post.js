import axios from 'axios';
import { server } from '../config/config';

export const getPosts = () => async dispatch => {
    try {
        dispatch({ type: 'GetAllPostsRequest' });

        const res = await axios.get(`${server}/api/v1/post`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: 'GetAllPostsSuccess', payload: res.data.posts });
    } catch (err) {
        dispatch({
            type: 'GetAllPostsFailure', payload: err?.response?.data.message
        })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        dispatch({ type: 'GetPostRequest' });
        const res = await axios.get(`${server}/api/v1/post/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
        });
        dispatch({ type: 'GetPostSuccess', payload: res.data });
    } catch (err) {
        dispatch({
            type: 'GetPostFailure', payload: err?.response?.data.message
        })
    }
}

export const createPost = (post) => async dispatch => {
    try {
        dispatch({ type: 'CreatePostRequest' });
        const form = new FormData();
        form.append('title', post.title);
        form.append('description', post.description);
        form.append('images', post.image);
        form.append('type', post.type);
        const res = await axios.post(`${server}/api/v1/post/upload`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
        });
        alert(res.data.success ? 'Post created successfully' : 'Post creation failed');
        dispatch({ type: 'CreatePostSuccess', payload: res.data });
        dispatch(getPosts());
    } catch (err) {
        alert(err?.response?.data.message);
        dispatch({
            type: 'CreatePostFailure', payload: err?.response?.data.message
        })
    }
}

export const updatePost = (post) => async dispatch => {
    try {
        dispatch({ type: 'UpdatePostRequest' });
        const res = await axios.put(`${server}/api/v1/post/${post.id}`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
        });
        alert(res.data.success ? 'Post updated successfully' : 'Post update failed');
        dispatch({ type: 'UpdatePostSuccess', payload: res.data });
    } catch (err) {
        alert(err?.response?.data.message);
        dispatch({
            type: 'UpdatePostFailure', payload: err?.response?.data.message
        })
    }
}