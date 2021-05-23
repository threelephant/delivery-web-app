import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}`;

const isAdmin = async () => {
    const response = await axios.get(`${url}/role`, token);
    return response.data;
}

export default isAdmin;