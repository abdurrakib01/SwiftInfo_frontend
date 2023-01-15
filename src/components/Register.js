import classes from "../styles/Login.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterUserMutation } from "../services/UserAuthApi";
import { storeToken } from "../services/LocalStorageService";
export default function Register(){
    const [user, setUser] = useState({
        user_name : "",
        email : "",
        password : "",
        password2 : "",
        tc : null
    })
    const [server_error, setServerError] = useState({})
    const [registerUser] = useRegisterUserMutation()

    const handleOnchage=(e)=>{
        var value = e.target.value;
        var name = e.target.name;
        setUser({
            ...user,
            [name] : value
        })
    }
    const navigate = useNavigate();
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const user_data = {
            user_name : user.user_name,
            email : user.email,
            password : user.password,
            password2 : user.password2,
            tc : user.tc,
        }
        const res = await registerUser(user_data)
        if(res.error){
            setServerError(res.error.data)
        }
        if(res.data){
            storeToken(res.data.token)
            navigate('/')
        }
    }

    const handleTC=(e)=>{
        if (e.target.checked){
            setUser({
                ...user,
                tc : true
            })
        }
    }

 
    return(
        <div className={classes.background}>
        <h2>Register Account</h2>
        <form onSubmit={handleSubmit}>
            <input className={classes.input} 
                onChange={handleOnchage}
                type="text" 
                name="user_name" 
                placeholder="Username"
                value={user.user_name}
                />
            {server_error.user_name?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.user_name[0]}</p> : ""}
            <input className={classes.input} 
                onChange={handleOnchage}
                type="email" 
                name="email" 
                placeholder="Email"
                value={user.email}
                />
            {server_error.email?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.email[0]}</p> : ""}
            <input className={classes.input} 
                onChange={handleOnchage}
                type="password" 
                name="password" 
                placeholder="Password"
                value={user.password}
                />
            {server_error.password?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.password[0]}</p> : ""}
            <input className={classes.input} 
                onChange={handleOnchage}
                type="password" 
                name="password2" 
                placeholder="Conform Password"
                value={user.password2}
                />
            {server_error.password2?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.password2[0]}</p> : ""}
            <label>
                <input type="checkbox"
                    onChange={handleTC}
                /><span className={classes.tc}>Terms & Conditions</span>
            </label>
            {server_error.tc?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.tc[0]}</p> : ""}
            <input type="submit" className={classes.btn} value="Sign up"/>
            {server_error.non_field_errors ? <p style={{
                fontSize:12,
                backgroundColor: 'rgb(255, 190, 190)',
                padding : 5,
                borderRadius:5,
                marginBottom:0,
            }}>{server_error.non_field_errors[0]}</p>:""}
        </form>

        <p>Already have a account?<Link to="/login">Sign In</Link></p>
    </div>
    );
}