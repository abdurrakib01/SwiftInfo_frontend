import Nav from "../Nav";
import Footer from "../Footer";
import Login from "../Login";
import { useEffect } from "react";
import { getToken } from "../../services/LocalStorageService";
export default function HomePage(){
    return(
        <>
        <Nav/>
        <Login/>
        <Footer/>
        </>
    );
}