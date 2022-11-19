import classes from "../styles/Login.module.css"
import { Link } from "react-router-dom";
export default function Register(){
    return(
        <div className={classes.background}>
        <h2>Register Account</h2>
        <form>
            <input className={classes.input} type="text" name="text" placeholder="UserName"/>
            <input className={classes.input} type="email" name="email" placeholder="Email"/>
            <input className={classes.input} type="password" name="password1" placeholder="Password"/>
            <input className={classes.input} type="password" name="password2" placeholder="Conform Password"/>
            <label>
                <input type="checkbox"/><span className={classes.tc}>Terms and Conditions</span>
            </label>
            <input type="submit" className={classes.btn} value="Sign up"/>
        </form>

        <p>Already have a account?<Link to="/login">Sign In</Link></p>
    </div>
    );
}