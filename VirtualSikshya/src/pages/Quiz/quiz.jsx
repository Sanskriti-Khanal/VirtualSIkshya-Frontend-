import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import studentquiz from "../../Components/quiz/studentquiz"; // Fix import

const quiz = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <studentquiz /> 
    </>
  );
};

export default quiz;
