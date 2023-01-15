import classes from "../styles/Content.module.css";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "../services/LocalStorageService";
import { setUserToken } from "../features/AuthSlice";
export default function Contents(){

    const [contents, setContents] = useState([]);


    var fetching=()=>{
        axios.get('http://127.0.0.1:8000/')
        .then(response =>{
            setContents(response.data);
        })
    }
    useEffect (()=>{
        fetching();
    },[]);
    
    const dispatch = useDispatch()
    const {access_token} = getToken()

    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch])
    return(
        <div>
            <div className={classes.title}>
                <h2>“Blogging is a conversation,<br/> not a code.”</h2>
                <div className={classes.search}>
                <form>
                    <input 
                        className={classes.search_field} 
                        type="search" 
                        placeholder="search blog here"
                        />
                    <input className={classes.button} type="submit" value="Search"/>
                </form>
                </div> 
            </div>
            <div className={classes.content}>
                {contents.map((value, index)=>(
                        <Content key={index} blog={value}/>
                    ))}
            </div>
        </div>
    );
}