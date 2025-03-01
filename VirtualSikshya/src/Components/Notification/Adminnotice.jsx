import { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/Notification.css";

const AdminNoticeUpload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notices, setNotices] = useState([]); // Store notices locally

    const handleUpload = (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error("Title and description are required!");
            return;
        }

        const newNotice = { id: notices.length + 1, title, description };
        setNotices([...notices, newNotice]); // Add notice to the list
        setTitle("");
        setDescription("");
        toast.success("Notice uploaded successfully");
    };

    const deleteNotice = (id) => {
        setNotices(notices.filter((notice) => notice.id !== id));
        toast.info("Notice deleted");
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📢 Upload Notice</h2>
            
            <form onSubmit={handleUpload} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Notice Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none shadow-sm hover:shadow-md"
                    required
                />
                <textarea
                    placeholder="Notice Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 outline-none shadow-sm hover:shadow-md"
                    rows="4"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                    📤 Upload Notice
                </button>
            </form>

            {/* Display Uploaded Notices */}
            {notices.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">📝 Uploaded Notices</h3>
                    <div className="space-y-3">
                        {notices.map((notice) => (
                            <div 
                                key={notice.id} 
                                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-transform duration-200 hover:scale-[1.02]"
                            >
                                <h4 className="text-lg font-semibold text-gray-800">{notice.title}</h4>
                                <p className="text-gray-600">{notice.description}</p>
                                <button 
                                    className="mt-2 text-red-600 font-medium hover:text-red-700 transition-all duration-200 flex items-center gap-2"
                                    onClick={() => deleteNotice(notice.id)}
                                >
                                    ❌ Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNoticeUpload;
