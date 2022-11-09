import classes from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
export default function Nav(){
    return(
        <nav>
            <div className={classes.logo}>
                <Link to="/"><h2><span>S</span>wift<span>I</span>nfo</h2></Link>
            </div>
            <div className={classes.menu}>
                <Link to="/newblog">New Blog</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Signup</Link>
            </div>
        </nav>
    );
}