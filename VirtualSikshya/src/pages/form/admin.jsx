import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Profile from "../../Components/form/profile"; // Fix import

const profile = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      <Profile /> {/* Correct component usage */}
    </>
  );
};

export default profile;
