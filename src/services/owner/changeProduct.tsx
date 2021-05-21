import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const changeProduct = async (id, data) => {
    const response = await axios.put(`${url}/store/menu/${id}`, data, token);
    return response.data;
}

export default changeProduct;