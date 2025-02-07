import React from "react";
import { CheckSquare, Book, Users, Activity } from "lucide-react";

const QuickActions = () => {
    return (
        <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button><CheckSquare /> Mark Attendance</button>
            <button><Book /> Upload Assignments</button>
            <button><Users /> Manage Students</button>
            <button><Activity /> Grade Assignments</button>
        </div>
    );
};

export default QuickActions;
