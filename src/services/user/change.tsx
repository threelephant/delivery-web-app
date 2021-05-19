import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}`;

const changeMainInfo = async (data) => {
    const response = await axios.put(`${url}/maininfo`, data, token);
    return response.data;
}

export default changeMainInfo;