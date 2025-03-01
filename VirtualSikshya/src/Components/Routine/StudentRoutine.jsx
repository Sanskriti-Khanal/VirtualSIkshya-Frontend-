import React from "react";
import "../../styles/Routine.css"; // Import styles

const StudentRoutine = () => {
  const schedule = [
    { id: 1, day: "Monday", subject: "Web Development", time: "08:30 AM - 10:00 AM", instructor: "Ayush Kaji Dangol" },
    { id: 2, day: "Monday", subject: "AI & ML", time: "10:30 AM - 12:00 PM", instructor: "Sujan Karki" },
    { id: 3, day: "Tuesday", subject: "Database Management", time: "01:00 PM - 02:30 PM", instructor: "Niraj Poudel" },
    { id: 4, day: "Tuesday", subject: "Computer Networks", time: "02:45 PM - 04:15 PM", instructor: "Manish Thapa" },
    { id: 5, day: "Wednesday", subject: "Data Structures", time: "09:00 AM - 10:30 AM", instructor: "Rashmi Sharma" },
    { id: 6, day: "Wednesday", subject: "Cyber Security", time: "11:00 AM - 12:30 PM", instructor: "Rupesh Shrestha" },
    { id: 7, day: "Thursday", subject: "Artificial Intelligence", time: "03:00 PM - 04:30 PM", instructor: "Anisha Maharjan" },
    { id: 8, day: "Thursday", subject: "Software Engineering", time: "08:00 AM - 09:30 AM", instructor: "Krishna Adhikari" },
    { id: 9, day: "Friday", subject: "Operating Systems", time: "10:00 AM - 11:30 AM", instructor: "Santosh Bhattarai" },
    { id: 10, day: "Friday", subject: "Mathematics for Computing", time: "12:45 PM - 02:15 PM", instructor: "Sushil Maharjan" },
  ];

  return (
    <div className="student-routine-container">
      <h2>📅 My Weekly Class Routine</h2>

      <table>
        <thead>
          <tr>
            <th>📆 Day</th>
            <th>📖 Subject</th>
            <th>⏰ Time</th>
            <th>👨‍🏫 Instructor</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              <td>{item.day}</td>
              <td>{item.subject}</td>
              <td>{item.time}</td>
              <td>{item.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRoutine;
