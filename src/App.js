import "./App.css";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import DetailsPage from "./components/pages/DetailsPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import NewBlogPage from "./components/pages/NewBlogPage";
// import { useSelector } from "react-redux";
import { getToken, storeToken } from "./services/LocalStorageService";
import ProfilePage from "./components/pages/ProfilePage";
import axios from "axios";
import { useEffect, useState } from "react";
import { access } from "./services/Context";


function App() {
  // const {access_token} = useSelector(state =>state.auth)
  const {access_token} = getToken();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true)
  const updateToken = async()=>{
    const {refresh_token} = getToken();
    await axios.post("http://127.0.0.1:8000/api/token/refresh/",
        {refresh:refresh_token},
        {
            headers : {
                "Accept" : "application/json"
            },
        }
        ).then(res=>{
            storeToken(res.data);
            setToken(!token);
        }).catch(err=>{
            console.log(err);
        })
  }
  useEffect(()=>{
    let fourmin = 1000*60*4;
    let interval = setInterval(()=>{
        if(access_token){
            updateToken();
        }
    }, fourmin)
    return ()=> clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, access_token])
  
  const [token, setToken] = useState(true);
  return (
    <access.Provider value={{token, setToken, updateToken}}>
    <Router>
    <div className="App">
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route exact path="/login" element={!access_token ?<LoginPage/>:<Navigate to="/"/>}/>
      <Route exact path="/register" element={<RegisterPage/>}/>
      <Route exact path="/newblog" element={access_token ?<NewBlogPage/>:<Navigate to="/login"/>}/>
      <Route exact path="/details" element={<DetailsPage/>}/>
      <Route exact path="/profile" element={<ProfilePage/>}/>
    </Routes>
    </div>
    </Router>
    </access.Provider>
  );
}

export default App;
