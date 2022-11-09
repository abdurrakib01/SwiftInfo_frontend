import classes from "../styles/Login.module.css";
import { Link } from "react-router-dom";
export default function Login(){
    return(
        <div className={classes.background}>
            <h2>Login</h2>
            <form>
                <input className={classes.input} type="email" name="email" placeholder="Email"/>
                <input className={classes.input} type="password" name="password1" placeholder="Password"/>
                <input type="submit" className={classes.btn} value="Sign in"/>
            </form>

            <p>Don't have a account? <Link to="/register">Sign Up</Link></p>
        </div>
    );
}