import React,{useState, useContext} from 'react';
import {LoginForm} from '../components/loginForm';
import {RegisterForm} from '../components/registerForm';
import {BrowserRouter as Router} from 'react-router-dom';
import '../public/css/auth.css';

export const AuthPage = () => {
    const [isLoginForm, setLoginForm] = useState(true);
    let selForm;
    let formHeader;

    if(isLoginForm) {
        selForm = <LoginForm/>
        formHeader = <div className="form-header">  
                        <span className="form-button">SING IN</span>
                        <button className="slide-button slide-button-right" onClick={() => setLoginForm(false)}>
                            <div className="form-button">REGISTER</div>
                        </button>
                     </div>
    }
    else{
        selForm = <RegisterForm/>
        formHeader = <div className="form-header">
                        <button className="slide-button slide-button-left" onClick={() => setLoginForm(true)}>
                            <span className="form-button">SING IN</span>
                        </button>
                        <span className="form-button">REGISTER</span>
                    </div>
    }
    
    return (
        <div id="bgColor">

        <div class="section-auth">
            <div class="logo">
                <img src="./images/logo.png" alt="logo"></img>
            </div>

            <div class="singin-form">
                {formHeader}
                {selForm}
            </div>
            
        </div>
            
        </div>
    )
};





























































// export const AuthPage = () => {

//     // this.state = {login: true};
//     // function handleButtonClick(){
//     //     this.setState = {login: !this.state.login};
//     // }

    // return (
    //     <body id="bgColor">

    //     <div class="section">
    //         <div class="logo">
    //             <img src="./images/logo.png" alt="logo"></img>
    //         </div>
    //         <LoginForm/>
    //         {/* if(true) {
    //             //<LoginForm onFormChange={this.handleButtonClick}/>
    //             <LoginForm/>
    //         }
    //         else {
    //             //<RegisterForm onFormChange={this.handleButtonClick}/>
    //             <RegisterForm/>
    //         } */}
            
    //     </div>
            
    //     </body>
// );
// };