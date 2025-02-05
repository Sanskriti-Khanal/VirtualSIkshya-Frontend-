import React, { useState } from "react";
import bgImage from '../assets/Images/Bg.png';
import logoImage from "../assets/Images/Logo.png";
import '../styles/Signin.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleToggle = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form>
          <div className="logo-container">
            <img src={logoImage} alt="Virtual Sikshya Logo" />
            <p>Virtual Sikshya</p>
          </div>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email for registration</span>
          <div className="infield"><input type="text" placeholder="Name" /></div>
          <div className="infield"><input type="email" placeholder="Email" name="email" /></div>
          <div className="infield"><input type="password" placeholder="Password" /></div>
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>
          <div className="logo-container">
            <img src={logoImage}  alt="Virtual Sikshya Logo" />
            <p>Virtual Sikshya</p>
          </div>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your account</span>
          <div className="infield"><input type="email" placeholder="Email" name="email" /></div>
          <div className="infield"><input type="password" placeholder="Password" /></div>
          <a href="#" className="forgot">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <img src={bgImage} alt="Welcome Back" className="overlay-image" />
            <h1>VIRTUAL SIKSHYA :</h1>
            <p>Welcome back! Sign in to access your learning hub.</p>
            <button onClick={handleToggle}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <img src={bgImage} alt="Welcome" className="overlay-image" />
            <h1>VIRTUAL SIKSHYA :</h1>
            <p>Join now to access courses, resources, and our community.</p>
            <button onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
        <button id="overlayBtn" onClick={handleToggle}></button>
      </div>
    </div>
  );
};

export default AuthForm;
