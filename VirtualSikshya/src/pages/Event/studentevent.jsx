import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/StudentSidebar";
import Event from "../../Components/Events/studenteve";

const Eventcalendar = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <Event />
    </>
  );
};

export default Eventcalendar;

