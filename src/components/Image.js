import classes from "../styles/Image.module.css";
export default function Image(props){
    return(
        <div className={classes.img}>
             {props.con ? (
                 <img className={classes.cover} src={props.image} alt=""/>
             ):<i className="material-icons" style={{fontSize : "100px"}}>add_a_photo</i>}
        </div>
    );
}