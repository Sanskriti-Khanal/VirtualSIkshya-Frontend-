import { useState } from "react";
// import axios from "../api/api"; // Adjust based on your API setup
import { toast } from "react-toastify";

const AdminNoticeUpload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Ensure authentication
            await axios.post("/notices", { title, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Notice uploaded successfully");
            setTitle("");
            setDescription("");
        } catch (error) {
            toast.error("Failed to upload notice");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Notice</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    rows="4"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Upload</button>
            </form>
        </div>
    );
};

export default AdminNoticeUpload;
