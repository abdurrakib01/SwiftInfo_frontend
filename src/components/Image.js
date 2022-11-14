import classes from "../styles/Image.module.css";
import im from "../assets/images/topic1.jpg";
export default function Image(props){
    console.log(props.con);
    console.log(props.image);
    return(
        <div className={classes.img}>
             {props.con ? (
                 <img className={classes.cover} src={props.image} alt=""/>
             ):<i className="material-icons" style={{fontSize : "100px"}}>add_a_photo</i>}
        </div>
    );
}