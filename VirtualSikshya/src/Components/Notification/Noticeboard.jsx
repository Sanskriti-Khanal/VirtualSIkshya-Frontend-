import { useState } from "react";

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false); // Dropdown visibility state
    const [notices] = useState([
        { id: 1, title: "Exam Schedule Released", description: "The final exam schedule is now available.", createdAt: new Date() },
        { id: 2, title: "Holiday Notice", description: "The college will remain closed on Friday.", createdAt: new Date() },
    ]);

    return (
        <div className="relative">
            {/* Notification Icon */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="relative p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
            >
                🔔 {/* Bell Icon */}
                {notices.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notices.length}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-3 font-semibold text-blue-700">📢 Notifications</div>
                    <div className="max-h-60 overflow-y-auto">
                        {notices.length === 0 ? (
                            <p className="text-gray-600 text-center p-3">No new notifications.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {notices.map((notice) => (
                                    <li key={notice.id} className="p-3 hover:bg-gray-100 transition">
                                        <h3 className="text-md font-semibold">{notice.title}</h3>
                                        <p className="text-sm text-gray-600">{notice.description}</p>
                                        <span className="text-xs text-gray-400">
                                            📅 {new Date(notice.createdAt).toLocaleDateString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="text-center p-2 border-t">
                        <button 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
