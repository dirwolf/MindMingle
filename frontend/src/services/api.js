import axios from 'axios';

const API=axios.create({

    baseURL:"http://localhost:5001",

});

API.interceptors.request.use((req)=>{

    const token=localStorage.getItem("token");

    console.log(token)

    if(token){

        req.headers.Authorization=`Bearer ${token}`;

    }

    return req;

},(error)=>{

    return Promise.reject(error);

})

export default API;