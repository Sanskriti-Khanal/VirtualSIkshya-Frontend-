import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Assignment from "../../Components/Assignment/teacherassign";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Assignment />
    </>
  );
};

export default Learn;

