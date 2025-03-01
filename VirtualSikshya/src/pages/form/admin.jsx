import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/AdminSidebar";
import Profiledata from "../../Components/form/profile"; // Fix import

const profile = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="admin" />
      <Profiledata /> {/* Correct component usage */}
    </>
  );
};

export default profile;
