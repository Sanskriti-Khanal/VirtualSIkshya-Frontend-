import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Event from "../../Components/Events/Teachereve";

const Eventcalendar = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Event />
    </>
  );
};

export default Eventcalendar;

