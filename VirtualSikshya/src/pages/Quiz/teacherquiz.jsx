import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Teacherquiz from "../../Components/quiz/Teacherquiz"; // Fix name


const quiz = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Teacherquiz />

    </>
  );
};

export default quiz;
