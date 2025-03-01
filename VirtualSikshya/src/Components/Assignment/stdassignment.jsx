import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../../styles/studentassign.css';


function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [studentEmail, setStudentEmail] = useState('');

  // Load assignments from localStorage
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
    setAssignments(savedAssignments);
  }, []);

  // Load submissions from localStorage
  useEffect(() => {
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || {};
    setSubmissions(savedSubmissions);
  }, []);

  // Save submissions to localStorage
  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSubmissionFile(e.target.files[0]);
    }
  };

  // Handle assignment submission
  const handleSubmit = (assignmentId) => {
    if (!submissionFile) {
      toast.error('Please select a file before submitting.');
      return;
    }
    if (!studentEmail.trim()) {
      toast.error('Please enter your email.');
      return;
    }

    const newSubmission = {
      fileUrl: URL.createObjectURL(submissionFile),
      fileName: submissionFile.name,
      submittedDate: new Date().toISOString(),
      status: 'Submitted ✅',
      studentEmail
    };

    setSubmissions((prev) => ({
      ...prev,
      [assignmentId]: newSubmission
    }));

    toast.success('Assignment submitted successfully ✅');
    setSubmissionFile(null);
    setStudentEmail('');
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired ❌';
    if (diffDays === 0) return 'Due Today ⚠️';
    return `${diffDays} Days Left ⏳`;
  };

  return (
    <div className="student-assignments-container">
      <h2>📚 Available Assignments</h2>

      {assignments.length === 0 ? (
        <p className="no-data">No assignments available.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.id} className={`assignment-card ${submissions[assignment.id] ? 'submitted' : ''}`}>
            <h4>{assignment.title}</h4>
            <p>{assignment.description}</p>
            <p><strong>📅 Due:</strong> {assignment.deadline} <span className="deadline">{calculateDaysRemaining(assignment.deadline)}</span></p>

            {assignment.file && (
              <a href={assignment.file} target="_blank" rel="noopener noreferrer">
                📂 {assignment.fileName}
              </a>
            )}

            {submissions[assignment.id] ? (
              <button className="submitted-btn" disabled>Submitted ✅</button>
            ) : (
              <button 
                className="view-btn" 
                onClick={() => setSelectedAssignment(assignment)}
              >
                View & Submit
              </button>
            )}
          </div>
        ))
      )}

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setSelectedAssignment(null)}>✖</button>
            <h3>{selectedAssignment.title}</h3>
            <p>{selectedAssignment.description}</p>
            <p><strong>📅 Deadline:</strong> {selectedAssignment.deadline} <span className="deadline">{calculateDaysRemaining(selectedAssignment.deadline)}</span></p>

            {selectedAssignment.file && (
              <a href={selectedAssignment.file} target="_blank" rel="noopener noreferrer">
                📂 {selectedAssignment.fileName}
              </a>
            )}

            <div className="submission-section">
              <h4>Submit Your Assignment</h4>
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                value={studentEmail} 
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <input type="file" onChange={handleFileChange} />
              {submissionFile && <p className="file-name">📎 {submissionFile.name}</p>}
              <button className="submit-btn" onClick={() => handleSubmit(selectedAssignment.id)}>
                Submit Assignment
              </button>
            </div>

            {/* Show submission status */}
            {submissions[selectedAssignment.id] && (
              <div className="submission-status">
                <h4>Your Submission</h4>
                <p><strong>📂 File:</strong> {submissions[selectedAssignment.id].fileName}</p>
                <p><strong>📅 Submitted On:</strong> {new Date(submissions[selectedAssignment.id].submittedDate).toLocaleDateString()}</p>
                <p><strong>🔖 Status:</strong> {submissions[selectedAssignment.id].status}</p>
                <a href={submissions[selectedAssignment.id].fileUrl} target="_blank" rel="noopener noreferrer">
                  🔗 View Submission
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentAssignments;
