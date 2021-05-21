import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const newProduct = async (store_id, data) => {
    const response = await axios.post(`${url}/store/${store_id}/menu`, data, token);
    return response.data;
}

export default newProduct;