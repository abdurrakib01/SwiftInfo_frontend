import classes from "../styles/NewBlog.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Image from "./Image";
import axios from "axios";
export default function NewBlog(){
    const [content, setContent] = useState({
        title : "",
        info : "",
        image : null,
        con : false,
        imagePreview : null,
    })

    const handleChange=(e)=>{
        var value = e.target.value;
        var name = e.target.name;
        setContent({
            ...content,
            [name] : value,
        })
    };
    const handleImageChange=(e)=>{
        setContent({
            image : e.target.files[0],
            imagePreview : URL.createObjectURL(e.target.files[0]),
            con : true,
        })
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(content.author)
        let form_data = new FormData();
        form_data.append('title', content.title);
        form_data.append('info', content.info);
        form_data.append('image', content.image, content.image.name);
        form_data.append('author', content.author);
        fetch("http://127.0.0.1:8000", {
            method : "POST",
            body : form_data
        })
        .then(res => {
            setContent({
                title : "",
                info : "",
                image : null,
                imagePreview : null,
                con : false
            })
          })
        .catch(err=>console.log(err))
    }

    return(
        <>
        <Link to="/" className={classes.back}><i className="material-icons">arrow_back</i></Link>
        <div className={classes.blog_container}>
            <form action="#" onSubmit={handleSubmit}>
                <Image con={content.con} image={content.imagePreview}/>
                <input type="file"
                    name="image"
                    accept="image/png, image/jpg"
                    onChange={handleImageChange}
                />
                <input className={classes.blog_title} 
                    type="text" 
                    name="title"
                    placeholder="Blog title"
                    onChange={handleChange}
                    value={content.title}
                />
                <textarea className={classes.blog_info} 
                    placeholder="write blog information"
                    name="info"
                    onChange={handleChange}
                    value={content.info}
                ></textarea>
                <input type="submit" className={classes.button} value="Publish"/>
            </form>
        </div>
        </>
    );
}