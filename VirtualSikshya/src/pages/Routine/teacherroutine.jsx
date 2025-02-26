import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Routinetable from "../../Components/Routine/TeacherRoutine";

const Routine = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      
      <Routinetable />
    </>
  );
};

export default Routine;

