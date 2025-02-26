import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Noticeboard from "../../Components/Notification/Adminnotice";

const Notice = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      
      <Noticeboard />
    </>
  );
};

export default Notice;
