import React from 'react';
import bgImage from '../assets/Images/Bg.png';
console.log("Importing Signin.css");
import '../styles/Signin.css';


const Overlay = () => {
    return (
        <div className="overlay-container" id="overlayCon">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <img src={bgImage} alt="Welcome Back" className="overlay-image" />
                    <h1>VIRTUAL SIKSHYA :</h1>
                    <p>Welcome back! Sign in to access your learning hub.</p>
                    <button>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <img src={bgImage} alt="Welcome" className="overlay-image" />
                    <h1>VIRTUAL SIKSHYA :</h1>
                    <p>Join now to access courses, resources, and our community.</p>
                    <button>Sign Up</button>
                </div>
            </div>
            <button id="overlayBtn"></button>
        </div>
    );
};

export default Overlay; 