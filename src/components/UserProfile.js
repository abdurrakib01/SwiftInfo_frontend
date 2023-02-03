import axios from "axios";
import { useEffect, useState } from "react";
import profile from "../assets/images/profile.jpeg";
import { getToken } from "../services/LocalStorageService";
import { useProfileQuery } from "../services/UserAuthApi";
import "../styles/Userprofile.css";
import Content from "./Content";
import Avatar from "react-avatar-edit";

export default function UserProfile(){
    const [edit, setEdit] = useState(false)
    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(false);
    let {access_token} = getToken();
    let {data, isSuccess} = useProfileQuery(access_token)
    const [user, setUser] = useState({
        id:'',
        user_name : '',
        email : '',
    })
    const [userInfo, setUserInfo] = useState({
        user_id : '',
        profile_image : null,
        bio : ""
    })
    const [infoData, setInfoData] =useState(false)
    useEffect(()=>{
        if(data && isSuccess){
            setUser({
                id:data.id,
                user_name : data.user_name,
                email : data.email
            })
            setLoading(true);
        }
    }, [data, isSuccess])
    const profileInfoFetch=()=>{
        axios.get(`http://127.0.0.1:8000/api/user/userinfo/${user.id}/`)
        .then(res=>{
            setUserInfo({
                user_id : res.data.user_id,
                profile_image : res.data.profile_image,
                bio : res.data.bio
            })
            setInfoData(true)
        })
    }
    const fetching=()=>{
        axios.post("http://127.0.0.1:8000/profile/", {email:user.email})
        .then(res=>{
            setContents(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    const editClick=()=>{
        setEdit(!edit);
    }

    useEffect(()=>{
        profileInfoFetch();
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
    useEffect(()=>{
        urltoFile(profile, 'profile.jpg','image/png, image/jpg, image/jpeg')
        .then(function(file){
            setSrc(file)
        })
    },[])

    const bioClick=async()=>{
        if(infoData){
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
        })}
        else{
            await axios.post('http://127.0.0.1:8000/api/user/userinfo/',
        {profile_image : src, bio: userInfo.bio},
        {headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'authorization' : `Bearer ${access_token}`,
        }})
        .then(res=>{
            profileInfoFetch();
            setEdit(!edit);
        })
        .catch(err=>{
            console.log(err);
        })
        }
    }

    const [src, setSrc] = useState(null)
    const onCrop=view=>{
        urltoFile(view, 'profile.jpg','image/png, image/jpg, image/jpeg')
        .then(function(file){
            setSrc(file)
        })
    }
    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType){
         return (fetch(url)
             .then(function(res){return res.arrayBuffer();})
             .then(function(buf){return new File([buf], filename,{type:mimeType});})
         );
    }

    const imageClick=async()=>{
        if(infoData){
        await axios.patch(`http://127.0.0.1:8000/api/user/userinfo/${userInfo.user_id}/`,
        {profile_image : src},
        {headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'authorization' : `Bearer ${access_token}`,
        }})
        .then(res=>{
            profileInfoFetch();
            setImageEdit(!imgEdit);
        })
        .catch(err=>{
            console.log(err);
        })
        }
        else{
            await axios.post('http://127.0.0.1:8000/api/user/userinfo/',
        {profile_image : src, bio:''},
        {headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'authorization' : `Bearer ${access_token}`,
        }})
        .then(res=>{
            profileInfoFetch();
            setImageEdit(!imgEdit);
        })
        .catch(err=>{
            console.log(err);
        })
        }
    
    }
    const [imgEdit, setImageEdit] = useState(false);
    const imgEditClick=()=>{
        setImageEdit(!imgEdit);
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
            {infoData?
            <img className="img"  src={userInfo.profile_image} alt=""/>:
            <img className="img"  src={profile} alt=""/>}
            <i className="material-icons" style={style.imgStyle}
                onClick={imgEditClick}>edit</i>
            </div>
            {imgEdit ?
            <div className="pro-img">
                <Avatar
                    width={300}
                    height={300}
                    onCrop={onCrop}
                />
                <button className="btn" onClick={imageClick}>Save</button>
            </div>
            :''}
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
        {contents.length === 0?<h3 className="msg">You didn't create any blog yet!</h3>:
        <div className="userblog">
            {contents.map((value, index)=>(
                <Content key={index} blog={value}/>
            ))}
        </div>}
        </div>
        </>
    )
}