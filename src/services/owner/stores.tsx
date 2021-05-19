import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/owner`;

const getOwnerStores = async () => {
    const response = await axios.get(`${url}/store`, token);
    return response;
}

export default getOwnerStores;