import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/StudentSidebar";
import Assignment from "../../Components/Assignment/stdassignment";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <Assignment />
    </>
  );
};

export default Learn;

