import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Routinetable from "../../Components/Routine/AdminRoutine";

const Routine = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      
      <Routinetable />
    </>
  );
};

export default Routine;

