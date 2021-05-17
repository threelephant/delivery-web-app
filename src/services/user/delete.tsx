import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}`;

const deleteUser = async () => {
    const response = await axios.delete(`${url}`, token);
    return response.data;
}

export default deleteUser;