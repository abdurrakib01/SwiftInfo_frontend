import axios from "axios";
import { getToken } from "../services/LocalStorageService";
const {refresh_token} = getToken();
axios.interceptors.response.use(res=>res, async error =>{
    if(error.response.status === 401){
        await axios.post("http://127.0.0.1:8000/api/token/refresh/", 
            {   headers: {
                    'authorization' : `Bearer ${refresh_token}`,
                    }
            },
        ).then(res=>{
            console.log(res);
        })
    }
})