import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/order`;

const newOrder = async (addressId) => {
    const response = await axios.post(`${url}/new/${addressId}`, null, token);
    return response.data;
}

export default newOrder;