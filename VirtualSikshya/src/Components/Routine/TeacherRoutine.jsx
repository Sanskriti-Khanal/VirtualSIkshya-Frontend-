import React from "react";
import "../../styles/Routine.css"; // Import styles

const TeacherRoutine = () => {
  const schedule = [
    { id: 1, day: "Monday", subject: "Web Development", time: "08:30 AM - 10:00 AM", classroom: "Room 101" },
    { id: 2, day: "Monday", subject: "AI & ML", time: "10:30 AM - 12:00 PM", classroom: "Room 102" },
    { id: 3, day: "Tuesday", subject: "Database Management", time: "01:00 PM - 02:30 PM", classroom: "Room 103" },
    { id: 4, day: "Tuesday", subject: "Computer Networks", time: "02:45 PM - 04:15 PM", classroom: "Room 104" },
    { id: 5, day: "Wednesday", subject: "Data Structures", time: "09:00 AM - 10:30 AM", classroom: "Room 105" },
    { id: 6, day: "Wednesday", subject: "Cyber Security", time: "11:00 AM - 12:30 PM", classroom: "Room 106" },
    { id: 7, day: "Thursday", subject: "Artificial Intelligence", time: "03:00 PM - 04:30 PM", classroom: "Room 107" },
    { id: 8, day: "Thursday", subject: "Software Engineering", time: "08:00 AM - 09:30 AM", classroom: "Room 108" },
    { id: 9, day: "Friday", subject: "Operating Systems", time: "10:00 AM - 11:30 AM", classroom: "Room 109" },
    { id: 10, day: "Friday", subject: "Mathematics for Computing", time: "12:45 PM - 02:15 PM", classroom: "Room 110" },
  ];

  return (
    <div className="teacher-routine-container">
      <h2>📅 My Weekly Teaching Schedule</h2>

      <table>
        <thead>
          <tr>
            <th>📆 Day</th>
            <th>📖 Subject</th>
            <th>⏰ Time</th>
            <th>🏫 Classroom</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              <td>{item.day}</td>
              <td>{item.subject}</td>
              <td>{item.time}</td>
              <td>{item.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRoutine;
