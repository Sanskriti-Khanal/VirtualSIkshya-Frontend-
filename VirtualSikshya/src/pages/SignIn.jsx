import React from 'react';
import logoImage from '../assets/Images/Logo.png'; // Import the image
import '../styles/Signin.css';

const SignIn = () => {
    return (
        <div className="form-container sign-in-container">
            <form action="#">
                <div className="logo-container">
                    <img src={logoImage} alt="Virtual Sikshya Logo" /> {/* Use the imported image */}
                    <p>Virtual Sikshya</p>
                </div>
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <div className="infield">
                    <input type="email" placeholder="Email" name="email" />
                    <label></label>
                </div>
                <div className="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <a href="#" className="forgot">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;