import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}/address`;

const getAddresses = async () => {
    const response = await axios.get(`${api}/users/address`, token);
    return response.data;
}

const addAddress = async (address) => {
    const response = await axios.post(`${url}`, address, token);
    return response.data;
}

const changeAddress = async (address, id) => {
    const response = await axios.put(`${url}/${id}`, address, token);
    return response.data;
}

const deleteAddress = async (id) => {
    const response = await axios.delete(`${url}/${id}`, token);
    return response.data;
}

export default { getAddresses, addAddress, changeAddress, deleteAddress };