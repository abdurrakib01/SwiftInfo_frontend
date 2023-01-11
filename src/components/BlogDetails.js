import classes from "../styles/BlogDetails.module.css";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUserToken } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../services/LocalStorageService";
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
const api = axios.create({
    baseURL : "http://127.0.0.1:8000/"
})
export default function BlogDetails(props){
    const[content, setContent] = useState({});

    
    const contentFetching = ()=>{
        api.get(`/${props.id}`)
        .then(response =>{
            setContent(response.data)
        });

    }

    useEffect(()=>{
        contentFetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const dispatch = useDispatch()
    const {access_token} = getToken()
    
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch])

    const date = content.time;
    var moment = require('moment');

    const authorInfo = useSelector(state=>state.user)
    const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');


    const navigate = useNavigate();

    const Delete=()=>{
        api.delete(`/${props.id}`, {
            headers: {
                'authorization' : `Bearer ${access_token}`,
            },
        })
        .then(response =>{
            navigate("/")
        })
        .catch(err=>{
            console.log(err)
        });
    }
    const handleClick=()=>{
        if (window.confirm("Sure you want to delete this Blog?")){ 
            Delete();
        }
    }
    return(
        <>
        <div className={classes.auth}>
            <Link to="/" className={classes.back} style={{paddingTop:"3px"}}>
            <i className="material-icons">arrow_back</i></Link>
            {(authorInfo.user_name === content.author)?
                <button className={classes.back} onClick={handleClick}>
                Delete</button>:""}
       </div>
        <div className={classes.blog_container}>
            <img src={content.image} alt=""/>
            <h2>{content.title}</h2>
            <div className={classes.author}>
                <p>Author: {content.author}</p>
                <p>{formattedDate}</p>
            </div>
            <div className={classes.info}>
                <p>{content.info}</p>
            </div>
        </div>
    </>

    );
}