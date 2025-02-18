import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import Studentform from "../../Components/form/Studentform"; // Fix import

const studentprofile = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <Studentform /> 
    </>
  );
};

export default studentprofile;
