import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const getOwnerStore = async (id) => {
    const response = await axios.get(`${url}/store/${id}`, token);
    return response.data;
}

export default getOwnerStore;