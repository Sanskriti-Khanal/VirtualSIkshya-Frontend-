import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import Teacherfees from "../../Components/fees/adminfees"; // Fix import

const Teacherfeespage = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="Teacher" />
      <Teacherfees /> 
    </>
  );
};

export default Teacherfeespage;
