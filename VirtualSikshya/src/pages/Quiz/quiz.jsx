import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import StudentQuiz from "../../Components/quiz/studentquiz"; // Fix name


const quiz = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <StudentQuiz />

    </>
  );
};

export default quiz;
