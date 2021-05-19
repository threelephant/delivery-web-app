import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/account/reset`;

const changePassword = async (credentials) => {
    const response  = await axios.post(url, credentials, token);
    return response.data;
}

export default changePassword;