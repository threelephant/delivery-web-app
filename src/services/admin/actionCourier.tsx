import axios from 'axios';
import api from '../apiHost';
import token from '../auth/token';

const url = `${api}/admin/courier`;

const getCouriersCandidate = async () => {
    const response = await axios.get(`${url}/candidate`, token);
    return response.data;
}

const acceptCourier = async (login) => {
    const response = await axios.post(`${url}/${login}/accept`, null, token);
    return response.data;
}

const denyCourier = async (login) => {
    const response = await axios.post(`${url}/${login}/deny`, null, token);
    return response.data;
}

export default { getCouriersCandidate, acceptCourier, denyCourier };