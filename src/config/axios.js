import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5400/api/v1/'
    : 'https://api.example.com/api/v1/';
export default axios;
