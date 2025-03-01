import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Lesson from "../../Components/Courses/teacherlesson";

const course = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      
      <Lesson />
    </>
  );
};

export default course;

