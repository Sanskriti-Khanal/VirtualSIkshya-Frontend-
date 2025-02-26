import React, { useState, useEffect } from "react";
import "./style.css";

function AssignmentsManager({ teacher }) {
  const [assignments, setAssignments] = useState([]);
  const [createMode, setCreateMode] = useState(false);

  // Assignment form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});

  // Load saved assignments from localStorage on mount
  useEffect(() => {
    const savedAssignments = localStorage.getItem("assignments");
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  // Department options
  const departmentOptions = [
    { value: "computing", label: "Computing" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "ethics", label: "Ethics" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
  ];

  // Get today's date for deadline restriction
  const today = new Date().toISOString().split("T")[0];

  // Validate assignment creation form
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!deadlineDate) newErrors.deadlineDate = "Deadline date is required";
    if (!deadlineTime) newErrors.deadlineTime = "Deadline time is required";
    if (!department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Create a new assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const deadlineDateTime = new Date(`${deadlineDate}T${deadlineTime}`);
    let fileUrl = file ? URL.createObjectURL(file) : null;

    const newAssignment = {
      id: Date.now().toString(),
      title,
      description,
      deadline: deadlineDateTime.toISOString(),
      fileUrl,
      fileName: file ? file.name : null,
      department,
      teacherId: teacher.id,
      createdDate: new Date().toISOString(),
    };

    setAssignments([...assignments, newAssignment]);

    // Reset form
    setTitle("");
    setDescription("");
    setDeadlineDate("");
    setDeadlineTime("");
    setFile(null);
    setDepartment("");
    setCreateMode(false);
  };

  // Toggle Create Mode
  const toggleCreateMode = () => {
    setCreateMode((prev) => !prev);
  };

  return (
    <div className="assignments-manager">
      <div className="manager-header">
        <h2>Assignment Management</h2>
        <button className={`btn-action ${createMode ? "active" : ""}`} onClick={toggleCreateMode}>
          {createMode ? "Cancel" : "Create Assignment"}
        </button>
      </div>

      {/* Create Assignment Form */}
      {createMode && (
        <div className="assignment-creator">
          <h3>Create New Assignment</h3>
          <form onSubmit={handleCreateAssignment}>
            <div className="form-group">
              <label htmlFor="title">Assignment Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment title"
                className={errors.title ? "error" : ""}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment description"
                rows="5"
                className={errors.description ? "error" : ""}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deadlineDate">Deadline Date</label>
                <input
                  type="date"
                  id="deadlineDate"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  min={today}
                  className={errors.deadlineDate ? "error" : ""}
                />
                {errors.deadlineDate && <span className="error-message">{errors.deadlineDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="deadlineTime">Deadline Time</label>
                <input
                  type="time"
                  id="deadlineTime"
                  value={deadlineTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                  className={errors.deadlineTime ? "error" : ""}
                />
                {errors.deadlineTime && <span className="error-message">{errors.deadlineTime}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={errors.department ? "error" : ""}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="file">Assignment File (Optional)</label>
              <input type="file" id="file" onChange={handleFileChange} />
            </div>

            <button type="submit" className="btn-create">Submit Assignment</button>
          </form>
        </div>
      )}

      {/* Assignment List */}
      <div className="assignment-list">
        {assignments.length === 0 ? (
          <p>No assignments created yet.</p>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment.id} className="assignment-item">
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
              {assignment.fileUrl && (
                <p>
                  <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">
                    View Assignment File
                  </a>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AssignmentsManager;
