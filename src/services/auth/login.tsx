import axios from 'axios';
import api from '../apiHost';

const url = `${api}/account/login`;

const login = async (credentials) => {
    const request = axios.post(url, credentials);
    const response = await request;
    return response.data;
}

export default login;