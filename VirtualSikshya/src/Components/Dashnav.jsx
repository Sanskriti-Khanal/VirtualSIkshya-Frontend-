import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./Darkmode";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Sidebar.css";
import profileImage from "../assets/Images/profile.jpg";

const Dashnav = ({ role }) => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [userName, setUserName] = useState("User");
    const [notices, setNotices] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Single state for notification dropdown

    // Fetch user name from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.name) {
                    setUserName(parsedUser.name);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    // Fetch notifications dynamically (you can replace this with an API call)
    useEffect(() => {
        setNotices([
            { id: 1, title: "🎥 Video Link for Testing", description: "Check SP5000COM - Android Development Week 9 for the source code and testing video link.", createdAt: new Date() },
            { id: 2, title: "📢 Holiday Notice", description: "The college will remain closed on Friday.", createdAt: new Date() },
            { id: 3, title: "📝 Assignment Submission", description: "Reminder: Submit your final project by Monday.", createdAt: new Date() },
        ]);
    }, []);

    // Close dropdown if user clicks outside
    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest(".notification-wrapper")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    // Determine greeting message dynamically
    const getGreetingMessage = () => {
        if (role === "admin") return "Welcome to Admin’s Dashboard";
        if (role === "teacher") return "Welcome to Teacher’s Dashboard";
        return "Welcome to Student’s Dashboard";
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="greeting">{getGreetingMessage()}</span>
            </div>
            <div className="navbar-right">
                <input type="text" className="search-bar" placeholder="Search..." />
                
                {/* Dark Mode Toggle */}
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>

                {/* Notification Bell with Counter */}
                <div className="notification-wrapper">
                    <button 
                        className="notifications" 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent closing immediately
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                    >
                        <i className="fas fa-bell"></i>
                        {notices.length > 0 && (
                            <span className="notification-count">{notices.length}</span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {isDropdownOpen && (
                        <div className="notification-dropdown">
                            <div className="dropdown-header">📢 Notifications</div>
                            {notices.length === 0 ? (
                                <p className="no-notices">No new notices</p>
                            ) : (
                                <ul>
                                    {notices.map((notice) => (
                                        <li key={notice.id} className="notice-item">
                                            <strong>{notice.title}</strong>
                                            <p>{notice.description}</p>
                                            <small>{new Date(notice.createdAt).toLocaleDateString()}</small>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="dropdown-footer">
                                <button 
                                    className="close-dropdown" 
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <img src={profileImage} alt="Profile" className="profile-image" />
                <span className="profile-name">{userName}</span>
            </div>
        </nav>
    );
};

export default Dashnav;
