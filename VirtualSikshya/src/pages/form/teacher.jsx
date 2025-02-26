import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Teacherform from "../../Components/form/Teacherform"; // Fix import

const profile = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Teacherform /> {/* Correct component usage */}
    </>
  );
};

export default profile;
