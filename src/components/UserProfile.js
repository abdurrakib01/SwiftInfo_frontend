import axios from "axios";
import { useEffect, useState } from "react";
import profile from "../assets/images/pho.jpg"
import { getToken } from "../services/LocalStorageService";
import { useProfileQuery } from "../services/UserAuthApi";
import "../styles/Userprofile.css";
import Content from "./Content";

export default function UserProfile(){
    const [user, setUser] = useState({
        user_name : '',
        email : '',
    })
    const [userInfo, setUserInfo] = useState({
        user_id : '1',
        profile_image : null,
        bio : ""
    })
    const [edit, setEdit] = useState(false)

    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(false);

    let {access_token} = getToken();
    let {data, isSuccess} = useProfileQuery(access_token)
    useEffect(()=>{
        if(data && isSuccess){
            setUser({
                user_name : data.user_name,
                email : data.email
            })
            setLoading(true);
        }
    }, [data, isSuccess])

    const fetching=()=>{
        axios.post("http://127.0.0.1:8000/profile/", {email:user.email})
        .then(res=>{
            setContents(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        axios.get(`http://127.0.0.1:8000/api/user/userinfo/${userInfo.user_id}/`)
        .then(res=>{
            setUserInfo({
                user_id : res.data.user_id,
                profile_image : res.data.profile_image,
                bio : res.data.bio
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    const editClick=()=>{
        setEdit(!edit);
    }

    useEffect(()=>{
        fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])
    const bioChange=(e)=>{
        let value = e.target.value;
        setUserInfo({
            ...userInfo,
            bio : value
        })
    }
    const [style, setStyle] = useState({
        visibility:'hidden',
        imgStyle : {visibility:'hidden'}
    })

    const bioClick=async()=>{
        await axios.patch(`http://127.0.0.1:8000/api/user/userinfo/${userInfo.user_id}/`,
        {bio : userInfo.bio},
        {headers : {
            'Content-Type' : 'application/json',
            'authorization' : `Bearer ${access_token}`
        }})
        .then(res=>{
            setUserInfo({
                ...userInfo,
                bio:res.data.bio
            })
            setEdit(!edit);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <>
        <div className="user">
            <div className="bio-img"
                onMouseEnter={e=>{
                    setStyle({
                        ...style,
                        imgStyle:{visibility:'visible'}
                    })
                }}
                onMouseLeave={e=>{
                    setStyle({
                        ...style,
                        imgStyle:{visibility:'hidden'}
                    })
                }}>
            <img className="img"  src={userInfo.profile_image} alt=""/>
            <i className="material-icons" style={style.imgStyle}
                onClick={editClick}>edit</i>
            </div>
            <h1>{user.user_name}</h1>
            <p>Email: {user.email}</p>
            <div className="bio-btn"
                onMouseEnter={e=>{
                    setStyle({
                        ...style,
                        visibility:'visible'
                    })
                }}
                onMouseLeave={e=>{
                    setStyle({
                        ...style,
                        visibility:'hidden'
                    })
                }}
            >
            <h4>Bio:</h4>
            <i className="material-icons" style={style}
                onClick={editClick}>edit</i>
            </div>
            {edit ?
            <div className="bio">
            <textarea className="bio-edit"
                value={userInfo.bio}
                onChange={bioChange}/>
            <button className="btn" onClick={bioClick}>Save</button>
            </div>
            : <p>{userInfo.bio}</p>}
        </div>
        <div className="blog">
            <h2>Your Blogs:</h2>
        <div className="userblog">
            {contents.map((value, index)=>(
                <Content key={index} blog={value}/>
            ))}
        </div>
        </div>
        </>
    )
}