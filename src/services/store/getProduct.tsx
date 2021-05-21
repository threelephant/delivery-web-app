import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store`;

const getProduct = async (id) => {
    const response = await axios.get(`${url}/menu/${id}`);
    return response.data;
}

export default getProduct;