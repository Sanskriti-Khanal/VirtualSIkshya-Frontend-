import React, { useState } from "react";
import "../../styles/Routine.css"; // Import styles

const AdminRoutine = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, subject: "Web Development", date: "2024-02-11", time: "08:30 AM - 10:00 AM", instructor: "Ayush Kaji Dangol", category: "Teacher" },
    { id: 2, subject: "AI & ML", date: "2024-02-12", time: "10:30 AM - 12:00 PM", instructor: "Sujan Karki", category: "Student" },
    { id: 3, subject: "Database Management", date: "2024-02-13", time: "01:00 PM - 02:30 PM", instructor: "Niraj Poudel", category: "Teacher" },
    { id: 4, subject: "Computer Networks", date: "2024-02-14", time: "02:45 PM - 04:15 PM", instructor: "Manish Thapa", category: "Student" },
    { id: 5, subject: "Data Structures", date: "2024-02-15", time: "09:00 AM - 10:30 AM", instructor: "Rashmi Sharma", category: "Teacher" },
    { id: 6, subject: "Cyber Security", date: "2024-02-16", time: "11:00 AM - 12:30 PM", instructor: "Rupesh Shrestha", category: "Teacher" },
    { id: 7, subject: "Artificial Intelligence", date: "2024-02-17", time: "03:00 PM - 04:30 PM", instructor: "Anisha Maharjan", category: "Student" },
    { id: 8, subject: "Software Engineering", date: "2024-02-18", time: "08:00 AM - 09:30 AM", instructor: "Krishna Adhikari", category: "Teacher" },
    { id: 9, subject: "Operating Systems", date: "2024-02-19", time: "10:00 AM - 11:30 AM", instructor: "Santosh Bhattarai", category: "Teacher" },
    { id: 10, subject: "Mathematics for Computing", date: "2024-02-20", time: "12:45 PM - 02:15 PM", instructor: "Sushil Maharjan", category: "Student" },
  ]);

  const [form, setForm] = useState({ subject: "", date: "", time: "", instructor: "", category: "" });

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Routine
  const addRoutine = (e) => {
    e.preventDefault();
    if (!form.subject || !form.date || !form.time || !form.instructor || !form.category) return;

    setSchedule([...schedule, { id: Date.now(), ...form }]);
    setForm({ subject: "", date: "", time: "", instructor: "", category: "" });
  };

  // Delete Routine
  const deleteRoutine = (id) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  return (
    <div className="routine-container">
      <h2>📅 Admin - Manage Class Routine</h2>

      {/* Routine Form */}
      <form className="routine-form" onSubmit={addRoutine}>
        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="time" placeholder="Time (e.g. 08:30 AM - 10:00 AM)" value={form.time} onChange={handleChange} required />
        <input type="text" name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
        <button type="submit">➕ Add Routine</button>
      </form>

      {/* Routine Table */}
      <table>
        <thead>
          <tr>
            <th>📖 Subject</th>
            <th>📅 Date</th>
            <th>⏰ Time</th>
            <th>👨‍🏫 Instructor</th>
            <th>🎓 Category</th>
            <th>🗑 Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id}>
              <td>{item.subject}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.instructor}</td>
              <td>{item.category}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteRoutine(item.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoutine;
