import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/StudentSidebar";
import Attendance from "../../Components/Attendance/Studentattendance";

const  attendanceRecords = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <Attendance />
    </>
  );
};

export default attendanceRecords;

