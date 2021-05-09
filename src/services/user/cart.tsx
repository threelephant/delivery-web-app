import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const login = sessionStorage.getItem('username');

const url = `${api}/users/${login}/cart`;

const getCart = async () => {
    const response = await axios.get(url, token);
    return response.data;
}

const getProductCart = async (id) => {
    const response = await axios.get(`${url}/${id}`, token);
    return response.data;
}

const addProduct = async (id) => {
    const response = await axios.post(`${url}/${id}/add`, null, token);
    return response.data;
}

const removeProduct = async (id) => {
    const response = await axios.post(`${url}/${id}/remove`, null, token);
    return response.data;
}

const patchCart = async (data) => {
    const response = await axios.patch(url, data, token);
    return response.status;
}

export default { getCart, getProductCart, patchCart, addProduct, removeProduct };