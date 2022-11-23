import classes from "../styles/Content.module.css";
import { Link } from "react-router-dom";
export default function Content(props){
    return(
        <div className= {classes.content_list}>
            <img src={props.img} alt=""/>
            <h3>{props.title}</h3>
            <p>{props.info}</p>
            <Link to="/details" state={{data:{id:props.id}}}>
            <i className="material-icons">arrow_forward</i></Link>
        </div>
    );
}