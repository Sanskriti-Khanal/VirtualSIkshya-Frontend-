import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Noticeboard from "../../Components/Notification/Noticeboard";
// import { useAuth } from "../../context/AuthContext"; // Import authentication context

const Notice = () => {
//   const { user } = useAuth(); // Assuming you have an auth context
  const role = user?.role || "student"; // Default to "student" if no role is found

  return (
    <>
      <Sidebar />
      <Dashnav role={role} />
      <Noticeboard />
    </>
  );
};

export default Notice;
