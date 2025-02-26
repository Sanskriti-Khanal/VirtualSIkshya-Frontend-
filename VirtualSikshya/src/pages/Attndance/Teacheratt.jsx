import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Attendance from "../../Components/Attendance/Teacherattendance";

const  attendanceRecords = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Attendance />
    </>
  );
};

export default attendanceRecords;

