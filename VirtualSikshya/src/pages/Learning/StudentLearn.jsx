import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Learning from "../../Components/Learning/TeacherLearning";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <h1>hello</h1>
      <Learning />
    </>
  );
};

export default Learn;

