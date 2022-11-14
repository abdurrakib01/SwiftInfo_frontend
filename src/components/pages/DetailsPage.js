import Nav from "../Nav";
import Footer from "../Footer";
import BlogDetails from "../BlogDetails";
import { useLocation } from "react-router-dom";
export default function DetailsPage(props){
    const location = useLocation();
    return(
        <>
        <Nav/>
        <BlogDetails id={location.state.data.id}/>
        <Footer/>
        </>
    );
}