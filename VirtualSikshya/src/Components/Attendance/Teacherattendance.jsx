import React, { useState, useEffect } from "react";
import "../../styles/teacherattendance.css";

const TeacherStudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    const savedRecords = localStorage.getItem("studentAttendance");
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studentAttendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Dummy Student Data
  useEffect(() => {
    const studentData = [
      { id: 1, name: "Alice Johnson", faculty: "Computing" },
      { id: 2, name: "Bob Smith", faculty: "AI" },
      { id: 3, name: "Charlie Brown", faculty: "Mathematics" },
      { id: 4, name: "David Miller", faculty: "Ethics" },
      { id: 5, name: "Emma Davis", faculty: "Physics" },
      { id: 6, name: "Frank Wilson", faculty: "Computing" },
      { id: 7, name: "Grace Lee", faculty: "AI" },
    ];
    setStudents(studentData);
  }, []);

  // Mark Student Attendance
  const handleMarkAttendance = (studentId, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: { status, date: new Date().toLocaleDateString() },
    }));
  };

  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>

      {/* Faculty Filter */}
      <div className="filter-section">
        <label>Filter by Faculty:</label>
        <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
          <option value="all">All</option>
          <option value="Computing">Computing</option>
          <option value="AI">AI</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Ethics">Ethics</option>
          <option value="Physics">Physics</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Faculty</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => selectedFaculty === "all" || student.faculty === selectedFaculty)
              .map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.faculty}</td>
                  <td>
                    <select
                      value={attendanceRecords[student.id]?.status || ""}
                      onChange={(e) => handleMarkAttendance(student.id, e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherStudentAttendance;
