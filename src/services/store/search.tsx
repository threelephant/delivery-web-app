import axios from 'axios';
import api from '../apiHost';

const url = `${api}/store`;

const getStoreMenu = async (query) => {
    const response = await axios.get(`${url}/search?query=${query}`);
    return response.data;
}

export default getStoreMenu;