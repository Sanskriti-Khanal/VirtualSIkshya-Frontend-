// App.js
import React, { useState } from 'react';
import './App.css';

function studentass() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Problem Set",
      subject: "Mathematics",
      dueDate: "Feb 27",
      priority: "High"
    },
    {
      id: 2,
      title: "History Essay",
      subject: "History",
      dueDate: "Mar 2",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Science Lab Report",
      subject: "Science",
      dueDate: "Mar 5",
      priority: "High"
    },
    {
      id: 4,
      title: "English Literature Review",
      subject: "English",
      dueDate: "Mar 7",
      priority: "Medium"
    }
  ]);

  // Handle priority class assignment
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <div className="assignments-container">
        <div className="assignments-header">
          <h2>Upcoming Assignments</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="assignments-list">
          <div className="assignment-row header">
            <div className="assignment-cell">Assignment</div>
            <div className="assignment-cell">Subject</div>
            <div className="assignment-cell">Due Date</div>
            <div className="assignment-cell">Priority</div>
          </div>
          {assignments.map(assignment => (
            <div className="assignment-row" key={assignment.id}>
              <div className="assignment-cell assignment-title">{assignment.title}</div>
              <div className="assignment-cell">{assignment.subject}</div>
              <div className="assignment-cell">{assignment.dueDate}</div>
              <div className="assignment-cell">
                <span className={`priority-badge ${getPriorityClass(assignment.priority)}`}>
                  {assignment.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default studentass;