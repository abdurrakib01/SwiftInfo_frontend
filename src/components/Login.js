import classes from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Login(){
    const [user, setUser] = useState({
        email : "",
        password : "",
    })

    const handleChange=(e)=>{
        var value = e.target.value;
        var name = e.target.name;
        setUser({
            ...user,
            [name] : value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(user);
        axios.post("http://127.0.0.1:8000/api/user/login/", {
            email : user.email,
            password : user.password
        })
        .then(res=>{
            console.log(res)
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', res.config.data.user_name);
            console.log(localStorage.setItem('user', res.config.data.user_name))
            // setUser({
            //     email : "",
            //     password : "",
            // })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className={classes.background}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input className={classes.input} 
                onChange={handleChange}
                type="email" name="email" placeholder="Email"
                value={user.email}
                />
                <input className={classes.input} 
                onChange={handleChange}
                type="password" name="password" placeholder="Password"
                value={user.password}
                />
                <input type="submit" className={classes.btn} value="Sign in"/>
            </form>

            <p>Don't have a account? <Link to="/register">Sign Up</Link></p>
        </div>
    );
}