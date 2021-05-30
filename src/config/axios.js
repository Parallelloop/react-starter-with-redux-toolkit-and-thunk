import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5400/v1/'
    : 'https://api.example.com/v1/';
export default axios;
