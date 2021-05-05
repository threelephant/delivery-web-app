import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store/category`;

const getStoresByCategories = async (category: string) => {
    const request = axios.get(`${url}/${category}`);
    const response = await request;
    return response.data;
}

export default { getStoresByCategories };