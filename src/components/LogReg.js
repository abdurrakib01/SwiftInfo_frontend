import { Link } from "react-router-dom";
import classes from "../styles/LogReg.module.css";
export default function LogReg(){
    return(
        <div className={classes.logreg}>
            <Link to="/login" className={classes.focus}>Login</Link>
            <Link to="/register">Signup</Link>
        </div>
    );
}