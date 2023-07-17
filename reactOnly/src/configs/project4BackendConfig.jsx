import axios from "axios";

const project4BackendAxios = axios.create({
    baseURL: process.env.REACT_APP_PROJECT4_BACKEND_URL
})

export default project4BackendAxios