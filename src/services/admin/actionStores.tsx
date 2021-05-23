import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/admin/store`;

const getStoreCandidate = async () => {
    const response = await axios.get(`${url}/candidate`, token);
    return response.data;
}

const acceptStore = async (id) => {
    const response = await axios.post(`${url}/${id}/accept`, null, token);
    return response.data;
}

const denyStore = async (id) => {
    const response = await axios.post(`${url}/${id}/deny`, null, token);
    return response.data;
}

export default { getStoreCandidate, acceptStore, denyStore };