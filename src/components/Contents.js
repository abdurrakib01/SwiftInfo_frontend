import classes from "../styles/Content.module.css";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";

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
    },[0]);

    return(
        <div className={classes.content}>
            {contents.map((value, index)=>(
                <Content key={index} img={value.image} title={value.title} info={value.info} id={value.id}/>
            ))}
        </div>
    );
}