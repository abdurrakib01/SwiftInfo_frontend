import classes from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../services/UserAuthApi";
import { getToken, storeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../features/AuthSlice";

export default function Login(){
    const [user, setUser] = useState({
        email : "",
        password : "", 
    })
    const [server_error, setServerError] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser] = useLoginUserMutation();
    const handleChange=(e)=>{
        var value = e.target.value;
        var name = e.target.name;
        setUser({
            ...user,
            [name] : value
        })
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const login_data = {
            email : user.email,
            password : user.password
        }
        const res = await loginUser(login_data)
        if(res.error){
            setServerError(res.error.data)
        }
        if(res.data){
            storeToken(res.data.token)
            let {access_token} = getToken()
            dispatch(setUserToken({access_token:access_token}))
            navigate('/');
        }
    }

    let {access_token} = getToken()
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch]) 


    return(
        <div className={classes.background}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input className={classes.input} 
                onChange={handleChange}
                type="email" name="email" placeholder="Email"
                value={user.email}
                />
                {server_error.email?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
                }}>{server_error.email[0]}</p> : ""}
                <input className={classes.input} 
                onChange={handleChange}
                type="password" name="password" placeholder="Password"
                value={user.password}
                />
                {server_error.password?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
                }}>{server_error.password[0]}</p> : ""}
                <input type="submit" className={classes.btn} value="Sign in"/>
                {server_error.non_field_errors ? <p style={{
                fontSize:12,
                backgroundColor: 'rgb(255, 190, 190)',
                padding : 5,
                borderRadius:5,
                marginBottom:0,
                }}>{server_error.non_field_errors[0]}</p>:""}
            </form>

            <p>Don't have a account? <Link to="/register">Sign Up</Link></p>
        </div>
    );
}