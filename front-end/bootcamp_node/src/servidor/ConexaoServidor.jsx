import axios from 'axios';

const  ConectarBackend = axios.create({
  baseURL: 'http://localhost:3333',
  headers:{
    "Content-Type": "application/json"
  }
});

export default ConectarBackend;
