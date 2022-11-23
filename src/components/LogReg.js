import { Link } from "react-router-dom";
import classes from "../styles/LogReg.module.css";
export default function LogReg(){
    return(
        <div className={classes.logreg}>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
        </div>
    );
}