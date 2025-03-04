import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/StudentSidebar";
import Learning from "../../Components/Learning/StudentLearning";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />

      <Learning />
    </>
  );
};

export default Learn;

