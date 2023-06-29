import axios from 'axios';

const conectarBackend = axios.create({
    baseURL: 'http://localhost:3333'
});

export default conectarBackend;