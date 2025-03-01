import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../../styles/notice.css";

const AdminNoticeUpload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notices, setNotices] = useState([]);

    // Default notices (Without Date)
    const defaultNotices = [
        {
            id: 1,
            title: "🎥 Video Link for Testing",
            description: "Check SP5000COM - Android Development Week 9 for the source code and testing video link.",
        },
        {
            id: 2,
            title: "📢 Holiday Notice",
            description: "The college will remain closed on Friday.",
        },
        {
            id: 3,
            title: "📝 Assignment Submission",
            description: "Reminder: Submit your final project by Monday.",
        },
    ];

    // Load notices from localStorage or set default notices if empty
    useEffect(() => {
        const storedNotices = localStorage.getItem("notices");
        if (storedNotices && JSON.parse(storedNotices).length > 0) {
            setNotices(JSON.parse(storedNotices));
        } else {
            setNotices(defaultNotices);
            localStorage.setItem("notices", JSON.stringify(defaultNotices)); // Store defaults
        }
    }, []);

    // Save notices to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("notices", JSON.stringify(notices));
    }, [notices]);

    const handleUpload = (e) => {
        e.preventDefault();
        
        if (!title.trim() || !description.trim()) {
            toast.error("Title and description are required!");
            return;
        }

        const newNotice = { 
            id: Date.now(), // Unique ID
            title: title.trim(), 
            description: description.trim(),
        };

        setNotices([...notices, newNotice]);
        setTitle("");
        setDescription("");
        toast.success("Notice uploaded successfully ✅");
    };

    const deleteNotice = (id) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            const updatedNotices = notices.filter((notice) => notice.id !== id);
            setNotices(updatedNotices);
            toast.info("Notice deleted 🗑️");

            if (updatedNotices.length === 0) {
                localStorage.removeItem("notices"); // Remove empty storage entry
            }
        }
    };

    return (
        <div className="admin-notice-container">
            <h2 className="title">📢 Upload Notice</h2>

            <form onSubmit={handleUpload} className="notice-form">
                <input 
                    type="text" 
                    placeholder="Notice Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    required
                />
                <textarea
                    placeholder="Notice Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-field"
                    rows="4"
                    required
                />
                <button type="submit" className="upload-button">
                    📤 Upload Notice
                </button>
            </form>

            {/* Display Uploaded Notices */}
            {notices.length > 0 && (
                <div className="notices-list">
                    <h3 className="notices-title">📝 Uploaded Notices</h3>
                    {notices.map((notice) => (
                        <div key={notice.id} className="notice-item">
                            <h4>{notice.title}</h4>
                            <p>{notice.description}</p>
                            <button className="delete-button" onClick={() => deleteNotice(notice.id)}>
                                ❌ Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminNoticeUpload;
