import "../styles/DropDown.css";
export default function Dropdown(props){
    return(
        <div className="dropdown">
            <img src={props.img}/>
            <p>{props.text}</p>
        </div>
    )
}