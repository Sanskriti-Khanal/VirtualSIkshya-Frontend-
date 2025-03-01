import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Course from "../../Components/Courses/admincourse";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      
      <Course />
    </>
  );
};

export default Learn;

