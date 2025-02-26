import React, { useState, useEffect } from "react";
import "../../styles/Studentattendance.css";
const StudentAttendance = ({ studentName }) => {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [studentAttendance, setStudentAttendance] = useState([]);

  // Load attendance data from local storage on mount
  useEffect(() => {
    const savedRecords = localStorage.getItem("studentAttendance");
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Fetch only the logged-in student's attendance records
  useEffect(() => {
    if (studentName) {
      const studentRecord = attendanceRecords[studentName] || [];
      setStudentAttendance(studentRecord);
    }
  }, [studentName, attendanceRecords]);

  return (
    <div className="student-attendance-container">
      <h2>Your Attendance Records</h2>

      {/* Attendance Records Table */}
      <div className="attendance-table">
        {studentAttendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {studentAttendance.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td className={`status-${record.status.toLowerCase()}`}>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
