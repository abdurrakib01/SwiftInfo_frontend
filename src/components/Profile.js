import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/AuthSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import classes from "../styles/Profile.module.css";
import { useProfileQuery } from "../services/UserAuthApi";
import { useEffect, useState } from "react";
import { setUserToken } from "../features/AuthSlice";
import { setUserInfo, unSetUserInfo } from "../features/UserSlice";
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

    // const userinfo = useSelector(state=>state.user)
    // console.log(userinfo)


    return(
        <div className={classes.profile}>
            <p className={classes.username}>{userData.user_name}</p>
            <p className={classes.logout} onClick={handleClick}>Logout</p>
        </div>
    );
}