import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/order`;

const getOrders = async () => {
    const response = await axios.get(url, token);
    return response.data;
}

export default getOrders;