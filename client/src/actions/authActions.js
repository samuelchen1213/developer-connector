import axios from 'axios';
import { GET_ERRORS } from './types';

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