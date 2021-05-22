import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner/order`;

const acceptOrder = async (id) => {
    const response = await axios.post(`${url}/${id}/accept`, null, token);
    return response.data;
}

const readyOrder = async (id) => {
    const response = await axios.post(`${url}/${id}/ready`, null, token);
    return response.data;
}

const denyOrder = async (id) => {
    const response = await axios.post(`${url}/${id}/deny`, null, token);
    return response.data;
}

export default { acceptOrder, readyOrder, denyOrder, };