import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store`;

const getStoresByProducts = async (data) => {
    const response = await axios.post(`${url}/search/stores`, data);
    return response.data;
}

export default getStoresByProducts;