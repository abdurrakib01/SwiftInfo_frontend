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
    }
    useEffect(()=>{
        fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])
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