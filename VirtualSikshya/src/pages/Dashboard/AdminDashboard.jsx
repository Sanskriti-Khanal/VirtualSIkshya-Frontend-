import React, { useState } from 'react';
import "../../styles/ExamDahboard.css";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
// Importing SVG icons as React components
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const Admin = () => {
  // Sample data - in a real app, this would come from an API
  const [exams, setExams] = useState([
    { id: 1, name: 'Mathematics Final', date: '2025-03-15', status: 'Scheduled', students: 156, avgScore: null, department: 'Science', duration: '3 hours' },
    { id: 2, name: 'Physics Midterm', date: '2025-03-05', status: 'Ongoing', students: 120, avgScore: null, department: 'Science', duration: '2 hours' },
    { id: 3, name: 'Computer Science', date: '2025-02-20', status: 'Completed', students: 89, avgScore: 76.5, department: 'Engineering', duration: '2.5 hours' },
    { id: 4, name: 'Chemistry Lab', date: '2025-02-15', status: 'Completed', students: 102, avgScore: 81.2, department: 'Science', duration: '2 hours' },
    { id: 5, name: 'English Literature', date: '2025-03-25', status: 'Scheduled', students: 134, avgScore: null, department: 'Humanities', duration: '1.5 hours' },
    { id: 6, name: 'World History', date: '2025-03-18', status: 'Scheduled', students: 98, avgScore: null, department: 'Humanities', duration: '2 hours' }
  ]);

  // Statistics
  const completedExams = exams.filter(exam => exam.status === 'Completed').length;
  const ongoingExams = exams.filter(exam => exam.status === 'Ongoing').length;
  const scheduledExams = exams.filter(exam => exam.status === 'Scheduled').length;
  const totalStudents = exams.reduce((total, exam) => total + exam.students, 0);
  
  // Average score calculation
  const completedExamsAvgScores = exams
    .filter(exam => exam.status === 'Completed' && exam.avgScore !== null)
    .map(exam => exam.avgScore);
  
  const overallAvgScore = completedExamsAvgScores.length > 0 
    ? (completedExamsAvgScores.reduce((sum, score) => sum + score, 0) / completedExamsAvgScores.length).toFixed(1) 
    : 'N/A';

  // Upcoming exam calculation
  const upcomingExams = exams
    .filter(exam => exam.status === 'Scheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const nextExam = upcomingExams.length > 0 ? upcomingExams[0] : null;
  const daysUntilNextExam = nextExam 
    ? Math.ceil((new Date(nextExam.date) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
   
    <div className="enhanced-dashboard">
       <Sidebar />
       <Dashnav role="admin" />
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <ChartIcon />
          </div>
          <div className="stat-content">
            <h3>Total Exams</h3>
            <p>{exams.length}</p>
          </div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card scheduled">
          <div className="stat-icon">
            <CalendarIcon />
          </div>
          <div className="stat-content">
            <h3>Scheduled</h3>
            <p>{scheduledExams}</p>
          </div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(scheduledExams / exams.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card ongoing">
          <div className="stat-icon">
            <UserIcon />
          </div>
          <div className="stat-content">
            <h3>Ongoing</h3>
            <p>{ongoingExams}</p>
          </div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(ongoingExams / exams.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">
            <CheckmarkIcon />
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p>{completedExams}</p>
          </div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(completedExams / exams.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Main Content */}
      <div className="dashboard-main">
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Next Upcoming Exam */}
          {nextExam && (
            <div className="upcoming-exam-card">
              <div className="card-header">
                <h2>Next Upcoming Exam</h2>
              </div>
              <div className="upcoming-exam-content">
                <div className="upcoming-exam-date">
                  <div className="date-display">
                    <div className="month">{new Date(nextExam.date).toLocaleString('default', { month: 'short' })}</div>
                    <div className="day">{new Date(nextExam.date).getDate()}</div>
                  </div>
                  <div className="countdown">{daysUntilNextExam} days left</div>
                </div>
                <div className="upcoming-exam-details">
                  <h3>{nextExam.name}</h3>
                  <div className="exam-meta">
                    <span className="meta-item">
                      <CalendarIcon /> {nextExam.duration}
                    </span>
                    <span className="meta-item">
                      <UserIcon /> {nextExam.students} students
                    </span>
                  </div>
                  <div className="exam-department">{nextExam.department}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Recent Exams Table */}
          <div className="exams-table-card">
            <div className="card-header">
              <h2>Exam Overview</h2>
              <button className="view-all-button">View All</button>
            </div>
            <div className="exams-table-container">
              <table className="exams-table">
                <thead>
                  <tr>
                    <th>Exam Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Students</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.slice(0, 5).map(exam => (
                    <tr key={exam.id}>
                      <td>
                        <div className="exam-name-cell">
                          <div className="exam-name">{exam.name}</div>
                          <div className="exam-department">{exam.department}</div>
                        </div>
                      </td>
                      <td>{new Date(exam.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${exam.status.toLowerCase()}`}>
                          {exam.status}
                        </span>
                      </td>
                      <td>{exam.students}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-button view-button">View</button>
                          <button className="action-button edit-button">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="dashboard-column">
          {/* Performance Card */}
          <div className="performance-card">
            <div className="card-header">
              <h2>Performance Overview</h2>
            </div>
            <div className="performance-content">
              <div className="performance-metric">
                <div className="metric-title">Average Score</div>
                <div className="metric-value">{overallAvgScore}</div>
                <div className="metric-chart">
                  <div className="chart-bar">
                    <div 
                      className="chart-fill" 
                      style={{ 
                        width: overallAvgScore !== 'N/A' ? `${parseFloat(overallAvgScore)}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="performance-metric">
                <div className="metric-title">Total Students</div>
                <div className="metric-value">{totalStudents}</div>
                <div className="metric-growth">+24 from last month</div>
              </div>
              
              <div className="performance-metric">
                <div className="metric-title">Completion Rate</div>
                <div className="metric-value">
                  {exams.length > 0 ? `${Math.round((completedExams / exams.length) * 100)}%` : '0%'}
                </div>
                <div className="metric-chart">
                  <div className="chart-bar">
                    <div 
                      className="chart-fill" 
                      style={{ 
                        width: exams.length > 0 ? `${(completedExams / exams.length) * 100}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-button create">
                <div className="button-icon"><PlusIcon /></div>
                <div className="button-text">Create New Exam</div>
              </button>
              
              <button className="quick-action-button reports">
                <div className="button-icon"><ChartIcon /></div>
                <div className="button-text">Generate Reports</div>
              </button>
              
              <button className="quick-action-button schedule">
                <div className="button-icon"><CalendarIcon /></div>
                <div className="button-text">Schedule Exam</div>
              </button>
              
              <button className="quick-action-button templates">
                <div className="button-icon"><FileIcon /></div>
                <div className="button-text">Exam Templates</div>
              </button>
            </div>
          </div>
          
          {/* Recent Activity Feed (simplified) */}
          <div className="activity-card">
            <div className="card-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-icon create"></div>
                <div className="activity-content">
                  <div className="activity-message">New exam created: <strong>Biology Final</strong></div>
                  <div className="activity-time">35 minutes ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon update"></div>
                <div className="activity-content">
                  <div className="activity-message">Grades uploaded for <strong>Computer Science</strong></div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon schedule"></div>
                <div className="activity-content">
                  <div className="activity-message"><strong>World History</strong> exam scheduled</div>
                  <div className="activity-time">Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;