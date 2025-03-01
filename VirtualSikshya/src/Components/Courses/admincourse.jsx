import React, { useState, useEffect } from "react";
import "../../styles/course.css";

const courseform = () => {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("coursesData");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });
  const [newCourse, setNewCourse] = useState({ name: "", teacher: "" });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState({ name: "", teacher: "" });

  useEffect(() => {
    localStorage.setItem("coursesData", JSON.stringify(courses));
  }, [courses]);

  const handleDeleteCourse = (courseName) => {
    const updatedCourses = courses.filter(course => course.name !== courseName);
    setCourses(updatedCourses);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
  };

  const handleAddCourse = () => {
    if (newCourse.name.trim() && newCourse.teacher.trim()) {
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      setNewCourse({ name: "", teacher: "" });
      localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course.name);
    setEditedCourse({ name: course.name, teacher: course.teacher });
  };

  const handleSaveEdit = () => {
    const updatedCourses = courses.map(course =>
      course.name === editingCourse ? { ...course, name: editedCourse.name, teacher: editedCourse.teacher } : course
    );
    setCourses(updatedCourses);
    setEditingCourse(null);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
  };

  return (
    <div className="course-container">
      <h2 className="course-header">COURSES</h2>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="course-item">
              {editingCourse === course.name ? (
                <div className="edit-course">
                  <input
                    type="text"
                    value={editedCourse.name}
                    onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedCourse.teacher}
                    onChange={(e) => setEditedCourse({ ...editedCourse, teacher: e.target.value })}
                  />
                  <button className="save-edit-btn" onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <div className="course-info">
                  <strong>{course.name}</strong>
                  <p>{course.teacher}</p>
                </div>
              )}
              <div className="course-actions">
                <span className="edit-icon" onClick={() => handleEditClick(course)}>✏️</span>
                <span className="delete-icon" onClick={() => handleDeleteCourse(course.name)}>🗑️</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses">No courses available. Add a course below.</p>
        )}
      </div>
      <div className="add-course-form">
        <h3>Form</h3>
        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            placeholder="Course name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Assign to:</label>
          <input
            type="text"
            placeholder="Teacher name"
            value={newCourse.teacher}
            onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
          />
        </div>
        <button className="add-course-btn" onClick={handleAddCourse}>ADD COURSE</button>
      </div>
    </div>
  );
};

export default courseform;