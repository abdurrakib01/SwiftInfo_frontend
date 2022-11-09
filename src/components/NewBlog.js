import classes from "../styles/NewBlog.module.css";
import { Link } from "react-router-dom";
export default function NewBlog(){
    return(
        <>
        <Link to="/" className={classes.back}><i className="material-icons">arrow_back</i></Link>
        <div className={classes.blog_container}>
            <form action="#">
                <div className={classes.img}>
                    <i className="material-icons" style={{fontSize : "100px"}}>add_a_photo</i>
                </div>
                <input className={classes.blog_title} type="text" placeholder="Blog title"/>
                <textarea className={classes.blog_info} placeholder="write blog information"></textarea>
                <input type="submit" className={classes.button} value="Publish"/>
            </form>
        </div>
        </>
    );
}