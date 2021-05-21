import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner/store`;

const deleteStore = async (id) => {
    const response = await axios.delete(`${url}/${id}`, token);
    return response.data;
}

export default deleteStore;