import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';
import '../public/css/profile.css';
import axios from 'axios';

export const ProfilePage = () => {
    const auth = useContext(AuthContext)
    const [newUsername, setNewUsername] = useState(null);
    const [newPassword, setNewPassword] = useState({
        oldPassword: '', password: '', confirmPassword: ''
    });
    const [avatar, setAvatar] = useState(`http://localhost:3000/images/users-avatars\\${auth.userAvatar}`);
    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(false);

    const {userId, userName, role} = useContext(AuthContext);
    const {request} = useHttp();

    const changeUsername = event => {
        setNewUsername(event.target.value);
    }
    const changePassword = event => {
        setNewPassword({ ...newPassword, [event.target.name]: event.target.value});
    }

    const changeAvatar = event => {
        try{
            setImage(event.target.files[0]);
            setAvatar(URL.createObjectURL(event.target.files[0]));
            document.getElementById("filename").firstChild.data = event.target.files[0].name;
        } catch(e){}
    }

    const SaveAvatar = async() => {
        const data = new FormData();    
        data.append('image', image);
        const imgName = await axios.post("/api/uploadAvatar", data, {
            headers: {
                'content-type': 'multipart/form-data'
            }   
        });
        const name = imgName.data.filename;

        request('/api/profile/updateAvatar', 'POST', {name: name, userId: auth.userId});

        auth.login(auth.token, auth.userId, auth.role, auth.userName, name);
    }

    const SavePassword = async () => {
        const data = await request('/api/profile/updatePassword', 'POST', {userId, newPassword});
        ShowErrors(data.message);

        if(!data.message) {
            ResetPassword();
        }
    }

    const SaveUsername = async () => {
        const data = await request('/api/profile/updateUsername', 'POST', {userId, newUsername});
        ShowErrors(data.message);
        if(!data.message) {
            auth.login(auth.token, auth.userId, auth.role, data, auth.userAvatar);
            ResetUsername();
        }
    }
    
    const ResetImg = () => {
        setImage(null);
        setAvatar(`http://localhost:3000/images/users-avatars\\${auth.userAvatar}`);
        document.getElementById("filename").firstChild.data = "Select image";
    }

    const ResetUsername = () => {
        document.getElementById("username").value = "";
    }

    const ResetPassword = () => {
        document.getElementById("oldPassword").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }

    function ShowPassword(){
        const oldStyle = document.getElementById('show').className;
        const newClassName = oldStyle === 'far fa-eye showPassword' ? 'far fa-eye-slash showPassword' : 'far fa-eye showPassword';
        if(newClassName == 'far fa-eye showPassword')
        {
            document.getElementById('oldPassword').type = "text"
            document.getElementById('password').type = "text"
            document.getElementById('confirmPassword').type = "text"
        }
        else {
            document.getElementById('oldPassword').type = "password"
            document.getElementById('password').type = "password";
            document.getElementById('confirmPassword').type = "password";
        } 
        document.getElementById('show').className =  newClassName;
    }
    
    const ShowErrors = (errors) => {
        if(errors) {
            setErrors(errors);
            setSuccess(false);
        }
        else {
            setSuccess(true);
            setErrors(null);
        }
    }
    return (
    <div class="wrapper">
        <Navbar/>
        <div className="container profile-container">
            <div className="profile border-wrapper">
                <div className="profile-avatar">
                    <img src={avatar} alt="avatar"/>    
                </div>
                <div className="username">{userName}</div>
                <div className="userrole">{role}</div>
            </div>

            <div className="set">

            {errors && <div className="errors">{errors}</div>}
            {success && <div className="success">Changes saved</div>}
            <div className="settings">

                <div className="change-form border-wrapper avatar">
                    <div className="border-wrapper-title">Change Avatar</div>
                    <div class="field__wrapper">
                        <input name="myFile" type="file" id="field__file-2" class="field field__file" onChange={changeAvatar}/>
                        <label class="field__file-wrapper" for="field__file-2">
                            <div id="filename" class="field__file-fake">Select image</div>
                            <div class="field__file-button">Search</div>
                        </label>
                    </div>     
                    <div className="body-buttons">
                        <button className="singin-button" onClick={SaveAvatar}>SAVE</button>
                        <button className="back-button" onClick={ResetImg}>RESET</button>
                    </div>         
                </div>

                <div className="change-form border-wrapper big">
                    <div className="border-wrapper-title">Change Password</div>
                    <div className="input-container">
                        <label className="input-title" for="title">Old password</label>
                        <div className="password">
                            <input className="input-field" type="password" maxlength="40" id="oldPassword"
                            name="oldPassword" required onChange={changePassword}></input>
                            <i id="show" class="far fa-eye-slash showPassword" onClick={event => ShowPassword(event)}></i>
                        </div>
                    </div>
                    <div className="input-container">
                        <label className="input-title" for="title">New password</label>
                        <input className="input-field" type="password" maxlength="40" id="password"
                        name="password" required onChange={changePassword}></input>
                    </div>
                    <div className="input-container">
                        <label className="input-title" for="title">Confirm new password</label>
                        <input className="input-field" type="password" id="confirmPassword" name="confirmPassword" required 
                        onChange={changePassword}/>
                    </div>
                    <div className="body-buttons">
                        <button className="singin-button" onClick={SavePassword}>Change password</button>
                        <button className="back-button" onClick={ResetPassword}>RESET</button>
                    </div>
                </div>

                <div className="change-form border-wrapper">
                    <div className="border-wrapper-title">Change Username</div>
                    <div class="input-container">
                        <label className="input-title" for="title">New username</label>
                        <input className="input-field" type="text" id="username" name="username" required onChange={changeUsername}/>
                    </div>
                    <div className="body-buttons">
                        <button className="singin-button" onClick={SaveUsername}>Change username</button>
                        <button className="back-button" onClick={ResetUsername}>RESET</button>
                    </div>
                </div>
            </div>
            </div>

        </div>
        <Footer/>
    </div>
    );
}