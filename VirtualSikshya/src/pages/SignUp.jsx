import React from 'react';
import logoImage from '../assets/Images/Logo.png';
import '../styles/Signin.css';

const SignUp = () => {
    return (
        <div className="form-container sign-up-container">
            <form action="#">
                <div className="logo-container">
                    <img src={logoImage} alt="Virtual Sikshya Logo" />
                    <p>Virtual Sikshya</p>
                </div>
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <div className="infield">
                    <input type="text" placeholder="Name" />
                    <label></label>
                </div>
                <div className="infield">
                    <input type="email" placeholder="Email" name="email" />
                    <label></label>
                </div>
                <div className="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;