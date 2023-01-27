import classes from "../styles/NewBlog.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Image from "./Image";
import { useDispatch } from "react-redux";
import { getToken } from "../services/LocalStorageService";
import { setUserToken } from "../features/AuthSlice";
import { useEffect } from "react";
import axios from "axios";

export default function NewBlog(){
    const [content, setContent] = useState({
        id : "",
        title : "",
        info : "",
        image : null,
        con : false,
        imagePreview : null,
        imageUpdate : false,
    })
    const [server_error, setServerError] = useState({});
    const location = useLocation();

    useEffect(()=>{
        if(location.state != null){
            setContent({
                id : location.state.content.id,
                title : location.state.content.title,
                info : location.state.content.info,
                image : location.state.content.image,
                imagePreview : location.state.content.image,
                con : true
            })
        }
    }, [])
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
            ...content,
            image : e.target.files[0],
            imagePreview : URL.createObjectURL(e.target.files[0]),
            con : true,
            imageUpdate : true,
        })
    };
    const navigate = useNavigate()
    const {access_token} = getToken()


    const handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(content.image);
        let data = new FormData()
        if(content.imageUpdate){
        if(content.image){
            data.append("image", content.image, content.image.name)
        };
        }
        data.append("title", content.title)
        data.append("info", content.info)
        if(content.id === ""){
        await axios.post('http://127.0.0.1:8000/', data,{
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'authorization' : `Bearer ${access_token}`,
            },
        }).then(res=>{
            navigate('/');
        }).catch(err=>{
            setServerError(err.response.data)
        });
        }
        else{
            await axios.put(`http://127.0.0.1:8000/${content.id}/`, data, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'authorization' : `Bearer ${access_token}`,
                },
            }).then(res=>{
                navigate("/details", {state:{data:{id:content.id}}});
            }).catch(err=>{
                setServerError(err.response.data)
            });
            console.log(content.image)
        }

    }
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setUserToken({access_token:access_token}))
    },[access_token, dispatch])

    return(
        <>
        <Link to="/" className={classes.back}><i className="material-icons">arrow_back</i></Link>
        <div className={classes.blog_container}>
            <form onSubmit={handleSubmit}>
                <Image con={content.con} image={content.imagePreview}/>
                <input className={classes.file}
                    type="file"
                    name="image"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                />
                {server_error.image?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.image[0]}</p> : ""}
                <input className={classes.blog_title} 
                    type="text" 
                    name="title"
                    placeholder="Blog title"
                    onChange={handleChange}
                    value={content.title}
                />
                {server_error.title?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.title[0]}</p> : ""}
                <textarea
                    className={classes.blog_info} 
                    placeholder="write blog information"
                    name="info"
                    onChange={handleChange}
                    value={content.info}
                ></textarea>
                {server_error.info?<p style={{
                fontSize:12,
                color: 'red',
                margin : 0,
                marginRight: "75px",
            }}>{server_error.info[0]}</p> : ""}
                <input type="submit" className={classes.button} value="Publish"/>
            </form>
        </div>
        </>
    );
}