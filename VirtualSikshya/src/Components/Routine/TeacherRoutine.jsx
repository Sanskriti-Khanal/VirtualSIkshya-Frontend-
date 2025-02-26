import React, { useState, useEffect } from "react";
import "../../styles/Routine.css";

const TeacherRoutine = ({ teacherName }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const allSchedules = [
      { id: 1, subject: "Web Development", date: "2024-02-11", time: "08:30 AM - 10:00 AM", instructor: "Ayush Kaji Dangol", category: "Teacher" },
      { id: 2, subject: "AI & ML", date: "2024-02-12", time: "10:30 AM - 12:00 PM", instructor: "John Doe", category: "Student" },
    ];

    setSchedule(allSchedules.filter((item) => item.instructor === teacherName));
  }, [teacherName]);

  return (
    <div className="routine-container">
      <h2>Teacher Routine - {teacherName}</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              <td>{item.subject}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRoutine;
