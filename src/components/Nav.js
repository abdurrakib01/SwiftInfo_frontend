import classes from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import LogReg from "./LogReg";
import { getToken } from "../services/LocalStorageService";
export default function Nav(){
    const {access_token} = getToken()
    return(
        <nav>
            <div className={classes.logo}>
                <Link to="/"><h2><span>S</span>wift<span>I</span>nfo</h2></Link>
            </div>
            <div className={classes.menu}>
                <Link to="/newblog">New Blog</Link>
                {access_token? <Profile/> : <LogReg/>}
            </div>
        </nav>
    );
}