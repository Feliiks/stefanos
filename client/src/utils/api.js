import Axios from 'axios';

let instance = Axios.create({
    baseURL: "http://35.180.198.169:5000/v1"
});


export default instance;