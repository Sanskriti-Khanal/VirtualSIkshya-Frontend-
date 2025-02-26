import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import Learning from "../../Components/Learning";

const Learn = () => {
  return (
    <>
      <Sidebar />
      <Dashnav role="teacher" />
      <Learning />
    </>
  );
};

export default Learn;

