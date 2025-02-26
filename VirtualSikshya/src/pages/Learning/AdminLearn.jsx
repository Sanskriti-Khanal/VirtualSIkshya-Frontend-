import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Learning from "../../Components/Learning/AdminLearning";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      
      <Learning />
    </>
  );
};

export default Learn;

