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

export const createPost = (data) => async dispatch => {
    try {
        console.log(data);
        dispatch({ type: 'CreatePostRequest' });
        const newForm = new FormData();
        newForm.append('images', data.image);
        newForm.append('description', data.description);
        newForm.append('title', data.title);
        const res = await axios.post(`${server}/api/v1/post/upload`, newForm, {
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
        console.log(post);
        const res = await axios.put(`${server}/api/v1/post/${post.id}`, post, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
        });
        if (res.data.success) {
            dispatch(getPost(post.id));
        }
        dispatch({ type: 'UpdatePostSuccess', payload: res.data });
        window.location.href = `/post/${post.id}`;
    } catch (err) {
        alert(err?.response?.data.message);
        dispatch({
            type: 'UpdatePostFailure', payload: err?.response?.data.message
        })
    }
}