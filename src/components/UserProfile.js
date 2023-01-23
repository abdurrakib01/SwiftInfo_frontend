import axios from "axios";
import { useEffect, useState } from "react";
import profile from "../assets/images/profile.jpeg"
import { getToken } from "../services/LocalStorageService";
import { useProfileQuery } from "../services/UserAuthApi";
import "../styles/Userprofile.css";
import Content from "./Content";
export default function UserProfile(){
    const [user, setUser] = useState({
        user_name : '',
        email : '',
    })
    const [contents, setContents] = useState([])
    const [loading, setLoading] = useState(true);

    let {access_token} = getToken();
    let {data, isSuccess} = useProfileQuery(access_token)
    useEffect(()=>{
        if(data && isSuccess){
            setUser({
                user_name : data.user_name,
                email : data.email
            })
        }
    }, [data, isSuccess])

    const fetching=()=>{
        axios.post("http://127.0.0.1:8000/profile/", {email:user.email})
        .then(res=>{
            console.log(res.data);
            setContents(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetching();
    },[loading])
    return(
        <>
        <div className="user">
            <img className="img"  src={profile} alt=""/>
            <h1>{user.user_name}</h1>
            <p>Email: {user.email}</p>
            <h4>Bio:</h4>
            <p>I am abdur rakib. I want to be a good software ingineer</p>
        </div>
        <div className="blog">
            <h2>Your Blog:</h2>
        <div className="userblog">
            {contents.map((value, index)=>(
                <Content key={index} blog={value}/>
            ))}
        </div>
        </div>
        </>
    )
}