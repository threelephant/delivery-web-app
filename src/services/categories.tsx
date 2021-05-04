import axios from 'axios';
import api from './apiHost';

const url = `${api}/store/categories`;

const getCategories = async () => {
    const request = axios.get(url);
    const response = await request;
    return response.data;
}

export default { getCategories };