import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Learning from "../../Components/Learning/TeacherLearning";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Learning />
    </>
  );
};

export default Learn;

