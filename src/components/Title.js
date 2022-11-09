import classes from "../styles/Title.module.css";
export default function Title(){
    return(
        <div className={classes.title}>
            <h2>“Blogging is a conversation,<br/> not a code.”</h2>
            <div className={classes.search}>
            <form>
                <input className={classes.search_field} type="search" placeholder="search blog here"/>
                <input className={classes.button} type="submit" value="Search"/>
            </form>
            </div>
        </div>
    );
}