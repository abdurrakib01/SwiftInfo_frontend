import { redirect } from "react-router-dom";
import classes from "../styles/Profile.module.css";
export default function Profile(props){
    const handleClick=()=>{
        localStorage.clear();
    }
    return(
        <div className={classes.profile}>
            <p className={classes.username}>{localStorage.getItem('user')}</p>
            <p className={classes.logout} onClick={handleClick}>Logout</p>
        </div>
    );
}