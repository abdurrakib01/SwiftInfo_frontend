import classes from "../styles/BlogDetails.module.css";
import topic3 from "../assets/images/topic3.png";
import { Link } from "react-router-dom";
export default function BlogDetails(){
    return(
        <>
       <Link to="/" className={classes.back}><i className="material-icons">arrow_back</i></Link>
    <div className={classes.blog_container}>
        <img src={topic3} alt=""/>
        <h2>Full Stack Web Development</h2>
        <div className={classes.author}>
            <p>Author: Abdur</p>
            <p>1 day ago</p>
        </div>
        <div className={classes.info}>
            <p>
                Full-stack developers are experts in both the frontend and backend; 
                so, the full-stack of technology that makes up a website.<br/>
                They are proficient in both frontend and backend languages and 
                frameworks, as well as in server, network and hosting environments.<br/><br/>
                To get to this breadth and depth of knowledge, most full-stack 
                developers will have spent many years working in a variety of different 
                roles. They also tend to be well-versed in both business logic and user 
                experience, meaning they are not only well-equipped to get hands on, 
                but can also guide and consult on strategy too.<br/><br/>
                <h3>What is frontend web development?</h3>

 This skillset involves the actual presentation of your website—how the information in your website is 
 laid out in browsers and on mobile devices as well.<br/><br/>

Everything that you actually see on a website—the layout, the positioning of text and images, 
colors, fonts, buttons, and so on—are all factors that the frontend developer must consider.<br/><br/>

A dedicated frontend developer will be very experienced working with HTML and CSS, as well as 
the scripting language JavaScript. With these languages, the developer can very efficiently 
manipulate the information on a website to make it appealing and effective.<br/><br/>

If you would like to start learning these languages, then a free coding short course is the simplest 
way to kick things off. Our best advice is to start coding and building things as soon as possible, 
and these languages will put you in a great position to do that.<br/><br/>

The main goal of a frontend developer is to provide the platform for visitors to interact with, a 
platform which provides and receives information. This means some developers will be well-versed in 
web design and using software such as Photoshop and Illustrator to create graphics and themed layouts.<br/><br/>

Additional skillsets of a frontend developer could include user experience design and user interface 
design, skills which help a team evaluate the best methods of displaying and collecting information. 
A frontend developer who possesses these design skills is potentially more valuable as they can 
identify the look and feel of a site while assessing the technical capabilities of such a design 
at the same time.<br/><br/>

It should be noted that although this additional skillset might be useful to a developer, they are 
certainly not a requirement for the job.<br/><br/>
            </p>
        </div>
    </div>
    </>

    );
}