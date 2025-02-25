import React, { useState,useEffect } from "react";
import bgImage from '../assets/Images/Bg.png';
import logoImage from "../assets/Images/Logo.png";
import '../styles/Signin.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/guest-dashboard");
    }
  }, []);

  // Toggle form view
  const handleToggle = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  // Handle input changes for Login
  const handleLoginChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input changes for Registration
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await axios.post("http://localhost:3001/api/users/login", formData);
        console.log("🔍 API Response:", response.data); // Debugging log

        const { token, role, user_id, name } = response.data; // Ensure API returns "name"

        if (!name) {
            console.error("❌ Error: User name is missing in API response");
            window.alert("Login failed: No user name received");
            return;
        }

        const userData = { token, role, user_id, name }; // ✅ Store full user data

        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save user object in localStorage
        console.log("✅ Stored User in localStorage:", JSON.parse(localStorage.getItem("user"))); // Debugging log

        if (role === "student") navigate("/student-dashboard");
        else if (role === "teacher") navigate("/teacher-dashboard");
        else if (role === "admin") navigate("/admin-dashboard");
        else navigate("/guest-dashboard");
    } catch (err) {
        console.error("❌ Login Error:", err);
        window.alert("Incorrect Credentials");
    }
};


     


  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3001/api/users/register", registerData);
      alert("Registration successful! You can now log in.");
      setIsRightPanelActive(false);
    } catch (err) {
      window.alert("Registration failed. Please check your details.");
    }
  };

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
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
          <div className="infield">
            <input type="text" placeholder="Name" name="name" onChange={handleRegisterChange} required />
          </div>
          <div className="infield">
            <input type="email" placeholder="Email" name="email" onChange={handleRegisterChange} required />
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" name="password" onChange={handleRegisterChange} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <div className="logo-container">
            <img src={logoImage} alt="Virtual Sikshya Logo" />
            <p>Virtual Sikshya</p>
          </div>
          <h1>Sign in</h1>
          {error && <p className="error">{error}</p>}
          <div className="social-container">
            <a href="#http://localhost:3001/auth/google" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="http://localhost:3001/auth/facebook" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#http://localhost:3001/auth/linkedin" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your account</span>
          <div className="infield">
            <input type="email" placeholder="Email" name="email" onChange={handleLoginChange} required />
          </div>
          <div className="infield">
            <input type="password" placeholder="Password" name="password" onChange={handleLoginChange} required />
          </div>
          <a href="#" className="forgot">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay */}
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
