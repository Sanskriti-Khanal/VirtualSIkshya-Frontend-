import { useState, useEffect } from "react";
import "../../styles/Notification.css"; // Ensure this file exists and is correctly linked

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [notices, setNotices] = useState([]);

    // Update notifications when the component mounts
    useEffect(() => {
        setNotices([
            { id: 1, title: "🎥 Video Link for Testing", description: "Please check SP5000COM - Android Development Week 9 for the source code and testing video link." },
            { id: 2, title: "📢 Deadline Extension", description: "The college will remain closed on Friday." },
            { id: 3, title: "📝 Assignment Submission", description: "Reminder: Submit your final project by Monday." },
        ]);
    }, []); // Runs only once when the component loads

    return (
        <div className="notification-container">
            {/* Notification Bell Icon */}
            <button onClick={() => setIsOpen(!isOpen)} className="notification-icon">
                🔔
                {notices.length > 0 && <span className="notification-badge">{notices.length}</span>}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div className="notification-dropdown">
                    <div className="dropdown-header">📢 Notifications</div>
                    <div className="dropdown-content">
                        {notices.length === 0 ? (
                            <p className="no-notifications">No new notifications.</p>
                        ) : (
                            <ul>
                                {notices.map((notice) => (
                                    <li key={notice.id} className="notification-item">
                                        <h3>{notice.title}</h3>
                                        <p>{notice.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="dropdown-footer">
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
