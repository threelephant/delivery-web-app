import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const changeStore = async (id, data) => {
    const response = await axios.put(`${url}/store/${id}`, data, token);
    return response.data;
}

export default changeStore;