import React from "react";
import Dashnav from "../Components/Dashnav";
import Sidebar from "../Components/Sidebar";

const Admin = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role = "admin" />
     
    </>
  );
};

export default Admin;