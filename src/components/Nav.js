import classes from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import LogReg from "./LogReg";
export default function Nav(){
    if(localStorage.getItem('user')){
        var name = true;
    }
    else{
        name = false;
    }
    return(
        <nav>
            <div className={classes.logo}>
                <Link to="/"><h2><span>S</span>wift<span>I</span>nfo</h2></Link>
            </div>
            <div className={classes.menu}>
                <Link to="/newblog">New Blog</Link>
                {name? <Profile/> : <LogReg/>}
            </div>
        </nav>
    );
}