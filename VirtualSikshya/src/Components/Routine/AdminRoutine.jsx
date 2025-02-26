import React, { useState } from "react";
import "../../styles/Routine.css"; // Import styles

const AdminRoutine = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, subject: "Web Development", date: "2024-02-11", time: "08:30 AM - 10:00 AM", instructor: "Ayush Kaji Dangol", category: "Teacher" },
    { id: 2, subject: "AI & ML", date: "2024-02-12", time: "10:30 AM - 12:00 PM", instructor: "John Doe", category: "Student" },
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
      <h2>Admin - Manage Class Routine</h2>

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
        <button type="submit">Add Routine</button>
      </form>

      {/* Routine Table */}
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Instructor</th>
            <th>Category</th>
            <th>Action</th>
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
                <button className="delete-btn" onClick={() => deleteRoutine(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoutine;
