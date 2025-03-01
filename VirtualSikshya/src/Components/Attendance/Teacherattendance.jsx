import React, { useState, useEffect } from "react";
import "../../styles/teacherattendance.css";

const TeacherStudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // Load saved attendance from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("studentAttendance");
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save attendance records to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studentAttendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Dummy student data with Nepali names in English letters (20 students)
  useEffect(() => {
    const studentData = [
      { id: 1, name: "Sujan Adhikari", faculty: "Computing" },
      { id: 2, name: "Ram Bahadur", faculty: "AI" },
      { id: 3, name: "Anita Gurung", faculty: "Mathematics" },
      { id: 4, name: "Sita Tamang", faculty: "Ethics" },
      { id: 5, name: "Gopal Sharma", faculty: "Physics" },
      { id: 6, name: "Dipesh Chauhan", faculty: "Computing" },
      { id: 7, name: "Krishna Nepali", faculty: "AI" },
      { id: 8, name: "Manish Khatri", faculty: "Computing" },
      { id: 9, name: "Nirmal Thapa", faculty: "Mathematics" },
      { id: 10, name: "Raju Gurung", faculty: "Ethics" },
      { id: 11, name: "Bijay Rai", faculty: "Physics" },
      { id: 12, name: "Hari Adhikari", faculty: "Computing" },
      { id: 13, name: "Sunil Lama", faculty: "AI" },
      { id: 14, name: "Bikash Shrestha", faculty: "Mathematics" },
      { id: 15, name: "Prakash Karki", faculty: "Ethics" },
      { id: 16, name: "Santosh Khadka", faculty: "Physics" },
      { id: 17, name: "Dipak Dahal", faculty: "Computing" },
      { id: 18, name: "Roshan Bhattarai", faculty: "AI" },
      { id: 19, name: "Suman Bhandari", faculty: "Mathematics" },
      { id: 20, name: "Pradeep Magar", faculty: "Ethics" },
    ];
    setStudents(studentData);
  }, []);

  // Mark Attendance for a given student
  const handleMarkAttendance = (studentId, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: { status, date: new Date().toLocaleDateString() },
    }));
  };

  // Filter students by selected faculty (if not "all")
  const filteredStudents = students.filter(
    (student) => selectedFaculty === "all" || student.faculty === selectedFaculty
  );

  return (
    <div className="attendance-container">
      <h2>👨‍🏫 Student Attendance</h2>

      {/* Faculty Filter Dropdown */}
      <div className="filter-section">
        <label htmlFor="facultyFilter">Filter by Faculty: </label>
        <select
          id="facultyFilter"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
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
              <th>👤 Student Name</th>
              <th>📚 Faculty</th>
              <th>📅 Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.faculty}</td>
                <td>
                  <div className="attendance-buttons">
                    <button
                      className={attendanceRecords[student.id]?.status === "Present" ? "present active" : "present"}
                      onClick={() => handleMarkAttendance(student.id, "Present")}
                    >
                      ✅ Present
                    </button>
                    <button
                      className={attendanceRecords[student.id]?.status === "Absent" ? "absent active" : "absent"}
                      onClick={() => handleMarkAttendance(student.id, "Absent")}
                    >
                      ❌ Absent
                    </button>
                    <button
                      className={attendanceRecords[student.id]?.status === "Leave" ? "leave active" : "leave"}
                      onClick={() => handleMarkAttendance(student.id, "Leave")}
                    >
                      🏖️ Leave
                    </button>
                  </div>
                  {attendanceRecords[student.id] && (
                    <p className="status-text">
                      {attendanceRecords[student.id].date} - {attendanceRecords[student.id].status}
                    </p>
                  )}
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
