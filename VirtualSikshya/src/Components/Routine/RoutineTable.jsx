import React, { useState } from "react";
import { registerLicense } from "@syncfusion/ej2-base"; // Import license registration
import {
  ScheduleComponent,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
 /// / Ensure styling is applied

// 🔹 Register the Syncfusion License (Use your actual key from Syncfusion)
registerLicense("Ngo9BigBOggjHTQxAR8/V1NMaF1cWGhKYVJ1WmFZfVtgdVVMZFpbRXZPIiBoS35Rc0VhWH5ccnBSRGhcVEVz");

const RoutineTable = () => {
  const [scheduleData] = useState([
    {
      Id: 1,
      Subject: "ST5007CEM Web Dev",
      StartTime: new Date(2024, 1, 11, 8, 30),
      EndTime: new Date(2024, 1, 11, 10, 0),
      Instructor: "Ayush Kaji Dangol",
    },
    {
      Id: 2,
      Subject: "ST5001CEM AI & ML",
      StartTime: new Date(2024, 1, 12, 10, 30),
      EndTime: new Date(2024, 1, 12, 12, 0),
      Instructor: "John Doe",
    },
    {
      Id: 3,
      Subject: "ST5010CEM Cybersecurity",
      StartTime: new Date(2024, 1, 14, 14, 0),
      EndTime: new Date(2024, 1, 14, 15, 30),
      Instructor: "Jane Smith",
    },
  ]);

  return (
    <div className="dashboard-card full-width">
      <h5>Class Routine</h5>
      <ScheduleComponent
        height="500px"
        selectedDate={new Date(2024, 1, 11)}
        eventSettings={{ dataSource: scheduleData }}
        workWeekDays={[0, 1, 2, 3, 4, 5]} // Display Sunday - Friday
        startHour="08:00"
        endHour="18:00"
        timeScale={{ enable: true, interval: 60, slotCount: 2 }}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Week]} />
      </ScheduleComponent>
    </div>
  );
};

export default RoutineTable;
