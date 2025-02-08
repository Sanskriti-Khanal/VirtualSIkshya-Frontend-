import React from "react";
import Dashnav from "../Components/Dashnav"; // Import Dashnav
import Sidebar from "../Components/Sidebar"; 

const TeacherDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Left) */}
      <Sidebar />

      {/* Main Content (Right Side) */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar (Top) */}
        <Dashnav role="teacher" />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p>Welcome to the Teacher's Dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
