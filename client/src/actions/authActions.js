import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = (data, history) => (dispatch) => {
    axios.post('/api/users/register', data)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Login ( Get User Token )
export const loginUser = data => (dispatch) => {
    axios.post('/api/users/login', data)
        .then(res => {
            // Save to local storage
            const { token } = res.data;

            // Set token to local storage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth Header
            setAuthToken(token);

            // Decode Token
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch (err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data  
            })
        )
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}