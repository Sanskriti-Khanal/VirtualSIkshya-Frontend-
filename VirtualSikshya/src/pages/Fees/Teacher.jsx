import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import Teacherfees from "../../Components/fees/teacherfees"; // Fix import

const Teacherfeespage = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="Teacher" />
      <Teacherfees /> 
    </>
  );
};
//commit
export default Teacherfeespage;
