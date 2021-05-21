import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner/store`;

const deleteProduct = async (id) => {
    const response = await axios.delete(`${url}/menu/${id}`, token);
    return response.data;
}

export default deleteProduct;