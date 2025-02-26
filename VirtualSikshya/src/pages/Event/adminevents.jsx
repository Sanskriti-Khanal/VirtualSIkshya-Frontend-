import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Event from "../../Components/Events/EventCalendar";

const EventCalendar = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      <Event />
    </>
  );
};

export default EventCalendar;

