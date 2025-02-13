
import "../styles/teacherDashboard.css"; 
import React, { useState } from "react";

const Announcements = () => {

    return (
    <div className="dashboard-card half-width">
<h5>Announcements</h5>
<div className="announcement">
  <h6>Parent-Teacher Meeting</h6>
  <p>Scheduled for next Friday at 3 PM</p>
</div>
<div className="announcement">
  <h6>Annual Sports Day</h6>
  <p>Preparations begin next week</p>
</div>
</div>

);
};

export default Announcements;
