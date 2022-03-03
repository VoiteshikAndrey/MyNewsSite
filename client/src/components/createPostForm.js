import React, {useState, useEffect} from 'react';
import '../public/css/createPostForm.css';
import {useHttp} from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const CreatePostForm = ({loading, posts}) => {
    const[img, setImg] = useState(null);
    const[postImg, setPostImg] = useState(null);
    let {error, request} = useHttp(null);
    let history = useHistory();
    let result; 

    const [form, setForm] = useState({
        title: '', text: '', shortDescription: ''
    });

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
            const data = new FormData();
            data.append('image', img);
            
            const imgName = await axios.post("/api/upload", data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }   
            });
            const image = imgName.data.filename;
            const result = await request('/api/admin/post', 'POST', {...form, image});
            if(result) {
                history.push(`/post/${result._id}`);
            }
        } catch (err) {
            window.scrollTo(0, 0);
            console.log(err);
        }
    };

    return (

        <div className="container">
            
            <div className="section-header create-post-title">
                <div className="section-bar">
                    <div className="section-name">Create Post</div>
                </div>
            </div>
            
            <div className="input-container create-post-container">
            {error && error.map((error) => {
                return <div className="error-message">{error}</div>})
            }
                <label className="input-title" for="title">Title</label>
                {/* <div className="input" contenteditable="true" autofocus>Введите текст здесь</div> */}
                <input className="create-post-field field-title input-field" type="text" id="title"
                    name="title" contenteditable="true" autofocus required onChange={changeHandler} />
                
                <label className="input-title" for="text">Text</label>
                <textarea className="create-post-field field-text input-field" type="text" id="text" 
                name="text" required onChange={changeHandler}/>
        
                <label className="input-title" for="text">Short description</label>
                <textarea className="create-post-field field-shortDescription input-field" type="text" id="shortDescription"
                name="shortDescription" required onChange={changeHandler}/>
                
                <label className="input-title" for="img">Preview</label>
                <input className="input-field" type="file" name="image" required onChange={changeHandler}/>
                {postImg && <div className="create-post-image">
                    <img src={postImg} alt="PostImg"/> 
                </div>}
            </div>
            <div className="body-buttons">
                <button className="big-button singin-button" onClick={postHandler}>CREATE POST</button>
                <button className="back-button" type="reset" onClick={ResetImg}>RESET</button>
            </div>
        </div>       
    )
}