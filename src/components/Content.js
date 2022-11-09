import classes from "../styles/Content.module.css";
import topic1 from "../assets/images/topic1.jpg";
import topic2 from "../assets/images/topic2.jpg";
import topic3 from "../assets/images/topic3.png";
import topic4 from "../assets/images/topic4.jpg";
import topic5 from "../assets/images/topic5.jpg";
import topic6 from "../assets/images/topic6.jpg";
import { Link } from "react-router-dom";
export default function Content(){
    return(
        <div className={classes.content}>
        <div className= {classes.content_list}>
            <img src={topic1} alt=""/>
            <h3>HTML</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
            
        </div>
        <div className={classes.content_list}>
            <img src={topic2} alt=""/>
            <h3>Full Stack Web Development</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
        </div>
        <div className={classes.content_list}>
            <img src={topic3} alt=""/>
            <h3>Full Stack Web Development</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
        </div>
        <div className={classes.content_list}>
            <img src={topic4} alt=""/>
            <h3>Full Stack Web Development</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
        </div>
        
        <div className={classes.content_list}>
            <img src={topic5} alt=""/>
            <h3>Full Stack Web Development</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
        </div>
        
        <div className={classes.content_list}>
            <img src={topic6} alt=""/>
            <h3>Full Stack Web Development</h3>
            <p>This HTML course for web developers provides 
                a solid overview for developers, from 
                novice to expert level HTML.
            </p>
            <Link to="/details"><i className="material-icons">arrow_forward</i></Link>
        </div>
        
    </div>
    );
}