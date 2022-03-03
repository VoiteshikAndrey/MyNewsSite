import React, {useState, useEffect} from 'react';
import '../public/css/createPostForm.css';
import {useHttp} from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const EditForm = ({post, loading}) => {
    const[img, setImg] = useState(post.image);
    const[postImg, setPostImg] = useState(post.image);
    let {error, request} = useHttp(null);
    let history = useHistory();
    let result;
    // setPostImg(`images\\${post.image}`);

    const [form, setForm] = useState({
        title: post.title, text: post.text, shortDescription: post.shortDescription, postId: post._id
    });

    console.log(post._id);
    if(error){
        error = error.split(',');
    }
    const changeHandler = event => {
        
        if([event.target.name] == "image"){
            setImg(event.target.files[0]);
            try{
                setPostImg(URL.createObjectURL(event.target.files[0]));
            } catch(e) {
                ResetImg();
            }
            
        } else {
            setForm({ ...form, [event.target.name]: event.target.value });
        } 
    }

    const ResetImg = event => {
        setPostImg(null);
    }

    const postHandler = async (req, res) => {
        try {
            if(typeof img == 'string'){
                const result = await request('/api/admin/edit', 'POST', {...form, img});
                if(result) {
                    history.push(`/post/${result}`);
                }
                return;
            }
            const data = new FormData();
            data.append('image', img);
            
            const imgName = await axios.post("/api/upload", data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }   
            });
            const image = imgName.data.filename;
            const result = await request('/api/admin/edit', 'POST', {...form, image});
            if(result) {
                history.push(`/post/${result}`);
            }
        } catch (err) {
            window.scrollTo(0, 0);
            console.log(err);
        }
    };


    return (
        <>
        <div className="container">
            
            <div className="section-header create-post-title">
                <div className="section-bar">
                    <div className="section-name">Edit Post</div>
                </div>
            </div>
            
            <div className="input-container create-post-container">
            {error && error.map((error) => {
                return <div className="error-message">{error}</div>})
            }
                <label className="input-title" for="title">Title</label>
                {/* <div className="input" contenteditable="true" autofocus>Введите текст здесь</div> */}
                <input className="create-post-field field-title input-field" type="text" id="title"
                    name="title" contenteditable="true" autofocus required onChange={changeHandler} defaultValue={post.title}/>
                
                <label className="input-title" for="text">Text</label>
                <textarea className="create-post-field field-text input-field" type="text" id="text" 
                name="text" required onChange={changeHandler} defaultValue={post.text}/>
        
                <label className="input-title" for="text">Short description</label>
                <textarea className="create-post-field field-shortDescription input-field" type="text" id="shortDescription"
                name="shortDescription" required onChange={changeHandler} defaultValue={post.shortDescription}/>
                
                <label className="input-title" for="img">Preview</label>
                <input className="input-field" type="file" name="image" required onChange={changeHandler}/>
                {postImg && <div className="create-post-image">
                    <img src={`images\\${postImg}`} alt="PostImg"/> 
                </div>}
            </div>
            <div className="body-buttons">
                <button className="big-button singin-button" onClick={postHandler}>SAVE CHANGES</button>
                <button className="back-button" type="reset" onClick={ResetImg}>RESET</button>
            </div>
        </div>
        </>   
    )
}