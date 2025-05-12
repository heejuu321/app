import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://http://3.38.36.43:8082',
});

export default Api;