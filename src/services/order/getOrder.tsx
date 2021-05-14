import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/order`;

const getOrder = async (id) => {
    const response = await axios.get(`${url}/${id}`, token);
    return response.data;
}

export default getOrder;