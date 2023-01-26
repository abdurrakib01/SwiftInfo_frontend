import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/AuthSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import "../styles/Profile.css";
import { useContext, useEffect, useRef, useState } from "react";
import { setUserToken } from "../features/AuthSlice";
import { setUserInfo, unSetUserInfo } from "../features/UserSlice";
import axios from "axios";
import profile from "../assets/images/profile.jpeg";
import logout from "../assets/images/logout.png";

import { access } from "../services/Context";

export default function Profile(props){

    const {token, setToken, updateToken} = useContext(access);
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
        setToken(!token)
    }
    const {access_token} = getToken()
    const profileFetch =async()=>{
        await axios.get("http://127.0.0.1:8000/api/user/profile/",{
                headers: {
                    'Accept': 'application/json',
                    'authorization' : `Bearer ${access_token}`,
                }
            }
        )
        .then(res=>{
            setUserData({
                user_name: res.data.user_name,
                email: res.data.email
            })
            dispatch(setUserInfo({
                user_name : res.data.user_name,
                email : res.data.email
            }))
        })
        .catch(()=>{
            updateToken();
            setToken(!token)
        })
    }
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        profileFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])

    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch])
    

    const [open, setOpen] = useState(false);
    let menuRef = useRef();

    useEffect(()=>{
        let handler=(e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
    })

    return(
        <div ref={menuRef}>
        <div className="profile" onClick={()=>{setOpen(!open)}}>
            <p className="username">{userData.user_name}</p>
        </div>
        <div className={`dropdown_menu ${open?"active":"inactive"}`}>
            <div className="dropdown_info">
                <h3>{userData.user_name}</h3>
                <h4>{userData.email}</h4>
                <hr/>
            </div>
            <Link to="/profile" className="a">
            <div className="dropdown">
                <img src={profile} alt=""/>
                <p>Your Profile</p>
            </div>
            </Link>
            <div className="dropdown">
                <img src={logout} alt=""/>
                <p onClick={handleClick}>Logout</p>
            </div>
        </div>
        </div>
    );
}