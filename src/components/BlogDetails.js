import classes from "../styles/BlogDetails.module.css";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/"
})
export default function BlogDetails(props){
    const[content, setContent] = useState([]);
    useEffect(()=>{
        contentFetching();
    })
    const contentFetching = ()=>{
        api.get(`/${props.id}`)
        .then(response =>{
            setContent(response.data)
        });

    }
    console.log(content.author);
    const date = content.time;

    var moment = require('moment');

    const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    return(
        <>
       <Link to="/" className={classes.back}><i className="material-icons">arrow_back</i></Link>
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