import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Dashnav";
import StatsCard from "../Components/Statscard";
// import CalendarWidget from "../Components/CalendarWidget";
import PerformanceChart from "../Components/performancechart";
import NotificationCard from "../Components/Notifications";
import QuickActions from "../Components/QuickAction";
// import ScheduleWidget from "../Components/ScheduleWidget";
// import AIInsights from "../Components/AIInsights";
// import StudentActivity from "../Components/StudentActivity";
// import ToDoList from "../Components/ToDoList";

const TeacherDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`dashboard ${darkMode ? "dark" : ""}`}>
            <Sidebar />
            <div className="main-content">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className="dashboard-grid">
                    <div className="left-section">
                        <StatsCard />
                        <CalendarWidget />
                        <PerformanceChart />
                    </div>
                    <div className="center-section">
                        <StudentActivity />
                        <AIInsights />
                    </div>
                    <div className="right-section">
                        <NotificationCard />
                        <QuickActions />
                        <ScheduleWidget />
                        <ToDoList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
