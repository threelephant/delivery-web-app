import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}/address`;

const getAddresses = async () => {
    const response = await axios.get(`${api}/users/address`, token);
    return response.data;
}

export default { getAddresses };