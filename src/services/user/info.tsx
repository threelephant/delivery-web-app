import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}`;

const getUserInfo = async () => {
    const response = await axios.get(`${url}`, token);
    return response.data;
}

export default getUserInfo;