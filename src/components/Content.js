import classes from "../styles/Content.module.css";
import { Link } from "react-router-dom";
export default function Content(props){
    return(
        <Link to="/details" state={{data:{id:props.blog.id}}}>
        <div className= {classes.content_list}>
            <img src={props.blog.image} alt=""/>
            <h3>{props.blog.title}</h3>
            <p>{props.blog.info}</p>
            <p id={classes.author}>by {props.blog.author}</p>
        </div>
        </Link>
    );
}