import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const newStore = async (data) => {
    const response = await axios.post(`${url}/store`, data, token);
    return response.data;
}

export default newStore;