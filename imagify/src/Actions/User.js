import axios from 'axios';
import { server } from '../config/config';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LoginRequest' });
        console.log(email, password);
        const { data } = await axios.post(`${server}/api/v1/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
                
            },
        });
        document.cookie = `token=${data.token}`;
        dispatch({ type: 'LoginSuccess', payload: data.user });

    } catch (error) {
        alert(error?.response?.data.message);
        dispatch({
            type: 'LoginFailure',
            payload:  error?.response?.data.message
        })
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'LoadUserRequest' });

        const { data } = await axios.get(`${server}/api/v1/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
        });

        dispatch({ type: 'LoadUserSuccess', payload: data.user });

    } catch (error) {
        dispatch({
            type: 'LoadUserFailure',
            payload:  error?.response?.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(`${server}/api/v1/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        document.cookie = `token=; expires=${new Date(Date.now())} path=/ httpOnly=false`;
        window.location.href = '/';
        dispatch({ type: 'Logout' });

    } catch (error) {
        dispatch({
            type: 'Logout',
            payload:  error?.response?.data.message
        })
    }
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'RegisterRequest' });
        console.log(name, email, password);

        const { data } = await axios.post(`${server}/api/v1/register`, { name, email, password }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch({ type: 'RegisterSuccess', payload: data.user });
        document.cookie = `token=${data.token}; expires=${new Date(data.expiresIn)} path=/ httpOnly=false`;
        window.location.href = '/';

    } catch (error) {
        alert(error?.response?.data.message);
        dispatch({
            type: 'RegisterFailure',
            payload:  error?.response?.data.message
        })
    }
}