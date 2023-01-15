import { useDispatch} from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/AuthSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import classes from "../styles/Profile.module.css";
import { useProfileQuery } from "../services/UserAuthApi";
import { useEffect, useState } from "react";
import { setUserToken } from "../features/AuthSlice";
import { setUserInfo, unSetUserInfo } from "../features/UserSlice";
import { storeToken } from "../services/LocalStorageService";
import axios from "axios";
export default function Profile(props){
    const [userData, setUserData] = useState({
        user_name : "",
        email : ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(unSetUserToken({access_token:null}))
        dispatch(unSetUserInfo({user_name:null, email:null}))
        removeToken()
        navigate('/login')
    }
    const {access_token} = getToken()
    const {data, isSuccess} = useProfileQuery(access_token)

    useEffect(()=>{
        if(data && isSuccess){
            setUserData({
                user_name : data.user_name,
                email : data.email
            })
        }
    },[data, isSuccess])

    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch])
    
    useEffect(()=>{
        if(data && isSuccess){
            dispatch(setUserInfo({
                user_name : data.user_name,
                email : data.email
            }))
        }
    },[data, isSuccess, dispatch])

    let [loading, setLoading] = useState(true)

    const updateToken = async()=>{
        const {refresh_token} = getToken();
        await axios.post("http://127.0.0.1:8000/api/token/refresh/",
            {refresh:refresh_token},
            {
                headers : {
                    "Accept" : "application/json"
                },
            }
            ).then(res=>{
                storeToken(res.data);
                let {access_token} = getToken()
                dispatch(setUserToken({access_token:access_token}))
            }).catch(err=>{
                handleClick();
            })
    }


    useEffect(()=>{
        let fourmin = 1000*60*4;
        let interval = setInterval(()=>{
            if(access_token){
                updateToken()
            }
        }, fourmin)
        return ()=> clearInterval(interval)

    }, [access_token, loading])

    return(
        <div className={classes.profile}>
            <p className={classes.username}>{userData.user_name}</p>
            <p className={classes.logout} onClick={handleClick}>Logout</p>
        </div>
    );
}