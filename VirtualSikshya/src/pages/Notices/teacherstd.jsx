import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Noticeboard from "../../Components/Notification/Noticeboard";

const Notice = () => {
  const role = "student"; // Default role set to "student" (Remove authentication dependency)

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Dashnav role={role} />
        <Noticeboard />
      </div>
    </div>
  );
};

export default Notice;
