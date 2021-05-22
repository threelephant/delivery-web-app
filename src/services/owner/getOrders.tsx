import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const getOwnerStores = async (id) => {
    const response = await axios.get(`${url}/store/${id}/orders`, token);
    return response.data;
}

export default getOwnerStores;