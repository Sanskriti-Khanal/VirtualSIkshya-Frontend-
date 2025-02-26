import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/StudentSidebar";
import Routinetable from "../../Components/Routine/StudentRoutine";

const Routine = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      
      <Routinetable />
    </>
  );
};

export default Routine;

