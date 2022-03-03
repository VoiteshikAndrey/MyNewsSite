import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

//TODO: Сделать обработку в форме! 

export const LoginForm = () => {
    let history = useHistory();
    const auth = useContext(AuthContext);
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        login: '', password: ''
    });
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }       

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.role, data.userName, data.userAvatar);
            history.push("/");
        } catch (e) {}
    };

    // const ShowPassword = (event) => {
    //     event.toggle('fa-eye-slash');
    //     event.toggle('fa-eye');
    // }
    function ShowPassword(){
        const oldStyle = document.getElementById('show').className;
        const newClassName = oldStyle === 'far fa-eye showPassword' ? 'far fa-eye-slash showPassword' : 'far fa-eye showPassword';
        newClassName == 'far fa-eye showPassword'? 
            document.getElementById('password').type =  "text":
            document.getElementById('password').type = "password";
        document.getElementById('show').className =  newClassName;
      }

    return(
        <>
        <div className="form-body">
            <span className="body-title">SING IN</span>
            <span className="error-message">{error}</span>
                <div class="input-container">
                    <label className="input-title" for="login">Login</label>
                    <input className="input-field" autoFocus type="text" id="login" name="login"
                     onChange={changeHandler} required></input>
                    
                    <label className="input-title" for="password">Password</label>
                    <div className="password">
                        <input className="input-field" type="password" maxlength="40" id="password"
                        name="password" onChange={changeHandler} required></input>
                        <i id="show" class="far fa-eye-slash showPassword" onClick={event => ShowPassword(event)}></i>
                    </div>
                </div>
                <div className="body-buttons">
                    <button className="singin-button" type="submit" onClick={loginHandler} disabled={loading}>SING IN</button>
                    <form action="http://localhost:3000/">
                        <button className="back-button">BACK</button>
                    </form>
                </div>
        </div>

        <div class="form-footer">
            <div class="footer-title">or sing in with one of these services</div>
            <div class="footer-services">
                <a class="service" href="#">
                    <div class="service-logo">
                        <img src="./images/vk-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">VKontakte</div>
                </a>
                <a class="service" href="#">
                    <div class="service-logo">
                        <img src="./images/google-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">GOOGLE</div>
                </a>
            </div>
        </div>
        </>
    );
};
