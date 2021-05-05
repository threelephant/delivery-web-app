import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store`;

const getStore = async (id) => {
    const request = axios.get(`${url}/${id}`);
    const response = await request;
    return response.data;
}

export default getStore;