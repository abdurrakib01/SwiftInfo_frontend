import "./App.css";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import DetailsPage from "./components/pages/DetailsPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import NewBlogPage from "./components/pages/NewBlogPage";
import { useSelector } from "react-redux";
function App() {
  const {access_token} = useSelector(state =>state.auth)
  return (
    <Router>
    <div className="App">
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route exact path="/login" element={!access_token ?<LoginPage/>:<Navigate to="/"/>}/>
      <Route exact path="/register" element={<RegisterPage/>}/>
      <Route exact path="/newblog" element={access_token ?<NewBlogPage/>:<Navigate to="/login"/>}/>
      <Route exact path="/details" element={<DetailsPage/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
