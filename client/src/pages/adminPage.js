import React, {useState, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';
import {CreatePostForm} from '../components/createPostForm';
import axios from 'axios';

export const AdminPage = () => {
    const[img, setImg] = useState(null);
    const[avatar, setAvatar] = useState(null);
    let {error, request} = useHttp();
    let result;

    const [form, setForm] = useState({
        title: '', text: '', shortText: ''
    });

    if(error){
        error = error.split(',');
    }
    const changeHandler = event => {
        
        if([event.target.name] == "image"){
            setImg(event.target.files[0]);
            
        } else {
            setForm({ ...form, [event.target.name]: event.target.value });
        } 
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
            setAvatar(imgName.data.path);
            const image = imgName.data.filename;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="wrapper">
            <Navbar/>
            <CreatePostForm/>
            <Footer/>
        </div> 
    )
};