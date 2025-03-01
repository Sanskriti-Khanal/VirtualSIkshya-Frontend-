import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../api/api"; // ✅ Centralized API calls

import bgImage from '../assets/Images/Bg.png';
import logoImage from "../assets/Images/Logo.png";
import '../styles/Signin.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const AuthForm = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", role: "Student" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 🔹 Check if user is already logged in on page load
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.token) {
            console.log("🔍 Retrieved from localStorage:", userData);
            redirectUser(userData.role);
        }
    }, []);

    // 🔹 Function to redirect user based on role
    const redirectUser = (role) => {
        switch (role) {
            case "Student":
                navigate("/student-dashboard");
                break;
            case "Teacher":
                navigate("/teacher-dashboard");
                break;
            case "Admin":
                navigate("/admin-dashboard");
                break;
            default:
                navigate("/guest-dashboard");
        }
    };

    // 🔹 Toggle between login and signup forms
    const handleToggle = () => {
        setIsRightPanelActive(!isRightPanelActive);
    };

    // 🔹 Handle input changes for Login
    const handleLoginChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Handle input changes for Registration
    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    // 🔹 Handle Role Selection for Registration
    const handleRoleChange = (e) => {
        setRegisterData({ ...registerData, role: e.target.value });
    };

    // 🔹 Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await userAPI.login(formData);
            console.log("🔍 API Response:", response.data);

            const { token, role, user_id, name } = response.data;

            if (!role) {
                setError("Login failed: No role received from server.");
                return;
            }

            localStorage.setItem("user", JSON.stringify({ token, role, user_id, name }));

            console.log("✅ Stored in localStorage:", JSON.parse(localStorage.getItem("user")));

            redirectUser(role);
        } catch (err) {
            console.error("❌ Login Error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Login failed. Please check your details.");
        }
    };

    // 🔹 Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await userAPI.register(registerData);
            console.log("✅ Registration Successful:", response.data);

            alert("Registration successful! Redirecting...");

            // Auto-login after registration
            handleLogin(e);
        } catch (err) {
            console.error("❌ Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed. Please check your details.");
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
                    <input type="text" placeholder="Name" name="name" onChange={handleRegisterChange} required />
                    <input type="email" placeholder="Email" name="email" onChange={handleRegisterChange} required />
                    <input type="password" placeholder="Password" name="password" onChange={handleRegisterChange} required />

                    {/* ✅ Dropdown for selecting role */}
                    <select name="role" value={registerData.role} onChange={handleRoleChange} required>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>

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
                        <a href="http://localhost:8080/auth/google" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="http://localhost:8080/auth/facebook" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="http://localhost:8080/auth/linkedin" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" name="email" onChange={handleLoginChange} required />
                    <input type="password" placeholder="Password" name="password" onChange={handleLoginChange} required />
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
            </div>
        </div>
    );
};

export default AuthForm;
