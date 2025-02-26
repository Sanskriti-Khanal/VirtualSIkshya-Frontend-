import { useEffect, useState } from "react";
// import axios from "../api/api"; // Adjust based on your API setup
import { toast } from "react-toastify";

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get("/notices");
                setNotices(response.data);
            } catch (error) {
                toast.error("Failed to fetch notices");
            }
        };
        fetchNotices();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Notice Board</h2>
            {notices.length === 0 ? (
                <p className="text-gray-600">No notices available</p>
            ) : (
                <ul>
                    {notices.map((notice) => (
                        <li key={notice.id} className="p-4 border-b">
                            <h3 className="font-semibold">{notice.title}</h3>
                            <p className="text-gray-700">{notice.description}</p>
                            <span className="text-sm text-gray-500">
                                Posted on {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticeBoard;
