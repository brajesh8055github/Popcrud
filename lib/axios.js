import axios from 'axios';

const api =  axios.create({baseURL:"https://jsonplaceholder.typicode.com"})
api.interceptors.request.use((config)=>{
    console.log("Request:", config.method,config.url)
    return config
}, (error)=>Promise.reject(error))
export default api;