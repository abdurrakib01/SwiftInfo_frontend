import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import DetailsPage from "./components/pages/DetailsPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import NewBlogPage from "./components/pages/NewBlogPage";

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/register" element={<RegisterPage/>}/>
      <Route exact path="/newblog" element={<NewBlogPage/>}/>
      <Route exact path="/details" element={<DetailsPage/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
