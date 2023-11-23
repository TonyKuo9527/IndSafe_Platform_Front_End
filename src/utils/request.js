import axios from "axios";

const request = axios.create({
    baseURL: 'https://nchuai.jp.ngrok.io',
    timeout: 5000
});

export default request