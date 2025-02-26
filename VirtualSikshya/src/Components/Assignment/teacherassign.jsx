import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function AssignmentsManager({ teacher, addNotification }) {
  // States for assignment management
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionView, setSubmissionView] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // States for assignment creation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState('');
  const [createMode, setCreateMode] = useState(false);
  
  // States for submission management
  const [studentEmail, setStudentEmail] = useState('');
  const [submissionFile, setSubmissionFile] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({});
  
  // States for notification view
  const [showNotifications, setShowNotifications] = useState(false);
  
  const navigate = useNavigate();

  // Load saved assignments from localStorage on mount
  useEffect(() => {
    const savedAssignments = localStorage.getItem('assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }

    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Department options
  const departmentOptions = [
    { value: 'computing', label: 'Computing' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'ethics', label: 'Ethics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' }
  ];

  // Get minimum date (today) for date picker
  const today = new Date().toISOString().split('T')[0];

  // Validate assignment creation form
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!deadlineDate) newErrors.deadlineDate = 'Deadline date is required';
    if (!deadlineTime) newErrors.deadlineTime = 'Deadline time is required';
    if (!department) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file selection for assignment creation
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Create a new assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Combine date and time for deadline
    const deadlineDateTime = new Date(`${deadlineDate}T${deadlineTime}`);
    
    // Create file URL if file is uploaded
    let fileUrl = null;
    if (file) {
      // In a real app, you would upload to a server and get a URL
      // For this demo, we'll create a local object URL (won't persist after refresh)
      fileUrl = URL.createObjectURL(file);
    }
    
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
      submissions: []
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Create notification for new assignment
    addSystemNotification({
      id: Date.now().toString(),
      type: 'assignment',
      message: `New assignment "${title}" created for ${departmentOptions.find(d => d.value === department).label} department`,
      date: new Date().toISOString(),
      isRead: false
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDeadlineDate('');
    setDeadlineTime('');
    setFile(null);
    setDepartment('');
    setCreateMode(false);
  };

  // Add notification to the system
  const addSystemNotification = (notification) => {
    setNotifications(prevNotifications => [notification, ...prevNotifications]);
    if (addNotification) {
      addNotification(notification);
    }
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  // Handle sorting assignments
  const sortedAssignments = [...assignments].sort((a, b) => {
    // Sort by deadline (closest first)
    return new Date(a.deadline) - new Date(b.deadline);
  });

  // Handle viewing assignment submissions
  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionView(true);
  };

  // Handle viewing assignment details
  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionView(false);
  };

  // Close assignment details modal
  const handleCloseDetails = () => {
    setSelectedAssignment(null);
    setSubmissionView(false);
    setStudentEmail('');
    setSubmissionFile(null);
    setGrade('');
    setFeedback('');
    setErrors({});
  };

  // Validate submission form
  const validateSubmission = () => {
    const newErrors = {};
    
    if (!studentEmail.trim()) newErrors.studentEmail = 'Student email is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studentEmail)) {
        newErrors.studentEmail = 'Please enter a valid email address';
      }
    }
    
    if (!submissionFile) newErrors.submissionFile = 'Submission file is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle student submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateSubmission()) return;
    
    // In a real application, you would upload this file to a server
    const fileUrl = submissionFile ? URL.createObjectURL(submissionFile) : null;
    
    const newSubmission = {
      id: Date.now().toString(),
      studentEmail,
      fileUrl,
      fileName: submissionFile.name,
      submittedDate: new Date().toISOString(),
      grade: null,
      feedback: null
    };
    
    // Update the assignment with the new submission
    const updatedAssignments = assignments.map(a => {
      if (a.id === selectedAssignment.id) {
        return {
          ...a,
          submissions: [...a.submissions, newSubmission]
        };
      }
      return a;
    });
    
    setAssignments(updatedAssignments);
    
    // Create notification for new submission
    addSystemNotification({
      id: Date.now().toString(),
      type: 'submission',
      message: `New submission for "${selectedAssignment.title}" from ${studentEmail}`,
      date: new Date().toISOString(),
      isRead: false
    });
    
    // Reset form
    setStudentEmail('');
    setSubmissionFile(null);
    setErrors({});
    
    // Update selected assignment to show the new submission
    const updatedAssignment = updatedAssignments.find(a => a.id === selectedAssignment.id);
    setSelectedAssignment(updatedAssignment);
  };

  // Handle submission file change
  const handleSubmissionFileChange = (e) => {
    if (e.target.files[0]) {
      setSubmissionFile(e.target.files[0]);
    }
  };

  // Handle grading a submission
  const handleGradeSubmission = (assignmentId, submissionId) => {
    if (!grade.trim()) {
      setErrors({ grade: 'Grade is required' });
      return;
    }
    
    // Update the submission with grade and feedback
    const updatedAssignments = assignments.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          submissions: a.submissions.map(s => {
            if (s.id === submissionId) {
              return {
                ...s,
                grade,
                feedback: feedback.trim() ? feedback : null,
                gradedDate: new Date().toISOString()
              };
            }
            return s;
          })
        };
      }
      return a;
    });
    
    setAssignments(updatedAssignments);
    
    // Create notification for graded submission
    const submission = selectedAssignment.submissions.find(s => s.id === submissionId);
    addSystemNotification({
      id: Date.now().toString(),
      type: 'grade',
      message: `Graded submission for "${selectedAssignment.title}" from ${submission.studentEmail}`,
      date: new Date().toISOString(),
      isRead: false
    });
    
    // Reset form
    setGrade('');
    setFeedback('');
    setErrors({});
    
    // Update selected assignment to show the graded submission
    const updatedAssignment = updatedAssignments.find(a => a.id === assignmentId);
    setSelectedAssignment(updatedAssignment);
  };

  // Helper function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  // Calculate status for an assignment
  const getAssignmentStatus = (assignment) => {
    const now = new Date();
    const deadline = new Date(assignment.deadline);
    
    if (now > deadline) {
      return { label: 'Closed', class: 'status-closed' };
    } else {
      const diffTime = Math.abs(deadline - now);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        return { label: 'Due Soon', class: 'status-due-soon' };
      } else {
        return { label: 'Open', class: 'status-open' };
      }
    }
  };

  // Get notification icon class based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return 'icon-assignment';
      case 'submission':
        return 'icon-submission';
      case 'grade':
        return 'icon-grade';
      default:
        return 'icon-notification';
    }
  };

  // Toggle create assignment mode
  const toggleCreateMode = () => {
    setCreateMode(!createMode);
    if (showNotifications) setShowNotifications(false);
  };

  // Toggle notifications view
  const toggleNotificationsView = () => {
    setShowNotifications(!showNotifications);
    if (createMode) setCreateMode(false);
  };

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="assignments-manager">
      <div className="manager-header">
        <h2>Assignment Management</h2>
        <div className="header-actions">
          <button 
            className={`btn-action ${createMode ? 'active' : ''}`} 
            onClick={toggleCreateMode}
          >
            <i className="icon-create"></i>
            Create Assignment
          </button>
          <button 
            className={`btn-action ${showNotifications ? 'active' : ''}`} 
            onClick={toggleNotificationsView}
          >
            <i className="icon-notifications"></i>
            Notifications
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
        </div>
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
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment description, instructions, and requirements"
                rows="5"
                className={errors.description ? 'error' : ''}
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
                  className={errors.deadlineDate ? 'error' : ''}
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
                  className={errors.deadlineTime ? 'error' : ''}
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
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                {departmentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="file">Assignment Materials (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                />
                <div className="file-upload-info">
                  {file ? (
                    <span className="file-name">{file.name}</span>
                  ) : (
                    <span className="file-placeholder">No file selected</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-create">Create Assignment</button>
              <button type="button" className="btn-cancel" onClick={() => setCreateMode(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Notifications View */}
      {showNotifications && (
        <div className="notifications-container">
          <h3>Notifications</h3>
          
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <p>No notifications yet.</p>
            </div>
          ) : (
            <ul className="notifications-list">
              {notifications.map(notification => (
                <li 
                  key={notification.id} 
                  className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                  onClick={() => !notification.isRead && markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    <i className={getNotificationIcon(notification.type)}></i>
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <p className="notification-date">{formatDateTime(notification.date)}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Assignment List */}
      {!createMode && !showNotifications && (
        <div className="assignment-list-section">
          <div className="department-filter">
            <select 
              onChange={(e) => setDepartment(e.target.value || '')}
              value={department}
            >
              <option value="">All Departments</option>
              {departmentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {sortedAssignments.length === 0 ? (
            <div className="no-assignments">
              <p>No assignments created yet.</p>
            </div>
          ) : (
            <div className="assignment-list">
              {sortedAssignments
                .filter(a => !department || a.department === department)
                .map(assignment => {
                  const status = getAssignmentStatus(assignment);
                  const submissionCount = assignment.submissions ? assignment.submissions.length : 0;
                  const deptLabel = departmentOptions.find(d => d.value === assignment.department)?.label || 'Unknown';
                  
                  return (
                    <div key={assignment.id} className="assignment-card">
                      <div className="assignment-header">
                        <h3>{assignment.title}</h3>
                        <span className={`status-badge ${status.class}`}>{status.label}</span>
                      </div>
                      
                      <div className="assignment-meta">
                        <p className="deadline">
                          <i className="icon-clock"></i>
                          Due: {formatDateTime(assignment.deadline)}
                        </p>
                        <p className="department">
                          <i className="icon-department"></i>
                          Dept: {deptLabel}
                        </p>
                        <p className="submissions">
                          <i className="icon-submissions"></i>
                          Submissions: {submissionCount}
                        </p>
                      </div>
                      
                      <div className="assignment-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => handleViewDetails(assignment)}
                        >
                          View Details
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={() => handleViewSubmissions(assignment)}
                        >
                          View Submissions
                        </button>
                      </div>
                    </div>
                  );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={handleCloseDetails}>×</button>
            
            {submissionView ? (
              <div className="submissions-view">
                <h2>Submissions for {selectedAssignment.title}</h2>
                
                <div className="submission-form-container">
                  <h3>Submit Assignment (Student View)</h3>
                  <form onSubmit={handleSubmit} className="submission-form">
                    <div className="form-group">
                      <label htmlFor="studentEmail">Student Email</label>
                      <input
                        type="email"
                        id="studentEmail"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="student@example.com"
                        className={errors.studentEmail ? 'error' : ''}
                      />
                      {errors.studentEmail && <span className="error-message">{errors.studentEmail}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="submissionFile">Assignment File</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          id="submissionFile"
                          onChange={handleSubmissionFileChange}
                          className={errors.submissionFile ? 'error' : ''}
                        />
                        <div className="file-upload-info">
                          {submissionFile ? (
                            <span className="file-name">{submissionFile.name}</span>
                          ) : (
                            <span className="file-placeholder">No file selected</span>
                          )}
                        </div>
                      </div>
                      {errors.submissionFile && <span className="error-message">{errors.submissionFile}</span>}
                    </div>
                    
                    <button type="submit" className="btn-primary">Submit Assignment</button>
                  </form>
                </div>
                
                <div className="submissions-list">
                  <h3>All Submissions ({selectedAssignment.submissions.length})</h3>
                  
                  {selectedAssignment.submissions.length === 0 ? (
                    <p className="no-submissions">No submissions yet.</p>
                  ) : (
                    <ul>
                      {selectedAssignment.submissions.map(submission => (
                        <li key={submission.id} className="submission-item">
                          <div className="submission-details">
                            <p className="student-email">{submission.studentEmail}</p>
                            <p className="submission-date">Submitted: {formatDateTime(submission.submittedDate)}</p>
                            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">
                              {submission.fileName}
                            </a>
                          </div>
                          
                          <div className="grading-section">
                            {submission.grade ? (
                              <div className="graded-info">
                                <p className="grade">Grade: {submission.grade}</p>
                                {submission.feedback && (
                                  <p className="feedback">Feedback: {submission.feedback}</p>
                                )}
                                <p className="graded-date">Graded: {formatDateTime(submission.gradedDate)}</p>
                              </div>
                            ) : (
                              <div className="grade-form">
                                <input
                                  type="text"
                                  placeholder="Grade (e.g., A, B+, 95)"
                                  value={grade}
                                  onChange={(e) => setGrade(e.target.value)}
                                  className={errors.grade ? 'error' : ''}
                                />
                                <textarea
                                  placeholder="Feedback (optional)"
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  rows="2"
                                ></textarea>
                                <button 
                                  className="btn-secondary" 
                                  onClick={() => handleGradeSubmission(selectedAssignment.id, submission.id)}
                                >
                                  Save Grade
                                </button>
                                {errors.grade && <span className="error-message">{errors.grade}</span>}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="assignment-details">
                <h2>{selectedAssignment.title}</h2>
                
                <div className="detail-item">
                  <h3>Description:</h3>
                  <p>{selectedAssignment.description}</p>
                </div>
                
                <div className="detail-item">
                  <h3>Department:</h3>
                  <p>{departmentOptions.find(d => d.value === selectedAssignment.department)?.label || 'Unknown'}</p>
                </div>
                
                <div className="detail-item">
                  <h3>Deadline:</h3>
                  <p>{formatDateTime(selectedAssignment.deadline)}</p>
                </div>
                
                {selectedAssignment.fileUrl && (
                  <div className="detail-item">
                    <h3>Assignment Materials:</h3>
                    <a href={selectedAssignment.fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">
                      {selectedAssignment.fileName}
                    </a>
                  </div>
                )}
                
                <div className="detail-item">
                  <h3>Submissions:</h3>
                  <p>{selectedAssignment.submissions.length} submission(s)</p>
                  {selectedAssignment.submissions.length > 0 && (
                    <button 
                      className="btn-secondary"
                      onClick={() => setSubmissionView(true)}
                    >
                      View Submissions
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentsManager;