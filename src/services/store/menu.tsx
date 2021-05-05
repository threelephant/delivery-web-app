import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store`;

const getStoreMenu = async (id) => {
    const request = axios.get(`${url}/${id}/menu`);
    const response = await request;
    return response.data;
}

export default getStoreMenu;