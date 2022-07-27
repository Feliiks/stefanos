import Axios from 'axios';

let instance = Axios.create({
    baseURL: "https://api.stefanospronos.com/v1"
});


export default instance;