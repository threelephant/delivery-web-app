import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/order`;

const denyOrder = async (id) => {
    const response = await axios.post(`${url}/${id}/denied`, token);
    return response.data;
}

export default denyOrder;