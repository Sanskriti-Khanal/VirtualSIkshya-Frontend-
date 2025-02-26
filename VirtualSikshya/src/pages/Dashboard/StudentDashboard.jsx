import React from "react";
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar";
import { Bar, Pie } from 'recharts';
import { BarChart, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Calendar, Clock, Award, CheckCircle, TrendingUp, User, Bell } from 'lucide-react';
import { useState } from 'react';

const styles = {
  dashboard: {
   
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    marginTop:'60px',
    paddingLeft: '200px',
    paddingRight: '100px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#312E81',
    margin: '0'
  },
  headerSubtitle: {
    color: '#4F46E5',
    margin: '4px 0 0 0'
  },
  notificationContainer: {
    position: 'relative',
    cursor: 'pointer'
  },
  notificationIcon: {
    height: '24px',
    width: '24px',
    color: '#4F46E5'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#EF4444',
    color: 'white',
    fontSize: '12px',
    borderRadius: '50%',
    height: '20px',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userIconContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '4px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  userIconInner: {
    backgroundColor: '#4F46E5',
    borderRadius: '50%',
    padding: '4px'
  },
  userIcon: {
    height: '24px',
    width: '24px',
    color: 'white'
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  statsCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center'
  },
  iconContainer: {
    padding: '12px',
    borderRadius: '8px',
    marginRight: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueIconContainer: {
    backgroundColor: '#DBEAFE',
  },
  greenIconContainer: {
    backgroundColor: '#DCFCE7',
  },
  amberIconContainer: {
    backgroundColor: '#FEF3C7',
  },
  purpleIconContainer: {
    backgroundColor: '#F3E8FF',
  },
  blueIcon: {
    color: '#2563EB',
    height: '24px',
    width: '24px'
  },
  greenIcon: {
    color: '#16A34A',
    height: '24px',
    width: '24px'
  },
  amberIcon: {
    color: '#D97706',
    height: '24px',
    width: '24px'
  },
  purpleIcon: {
    color: '#9333EA',
    height: '24px',
    width: '24px'
  },
  statsLabel: {
    color: '#6B7280',
    fontSize: '14px',
    margin: '0 0 4px 0'
  },
  statsValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1F2937',
    margin: '0'
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  indigoBadge: {
    backgroundColor: '#E0E7FF',
    color: '#4F46E5'
  },
  blueBadge: {
    backgroundColor: '#DBEAFE',
    color: '#2563EB'
  },
  greenBadge: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A'
  },
  grayBadge: {
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    cursor: 'pointer'
  },
  chartContainer: {
    height: '256px'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0'
  },
  tableHeader: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    borderBottom: '1px solid #F3F4F6',
    whiteSpace: 'nowrap'
  },
  tableRow: {
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  },
  tableCellWithIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  calendarIcon: {
    height: '16px',
    width: '16px',
    marginRight: '4px',
    color: '#4F46E5'
  },
  highPriority: { color: '#EF4444', fontWeight: '500' },
  mediumPriority: { color: '#F59E0B', fontWeight: '500' },
  lowPriority: { color: '#10B981', fontWeight: '500' },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  profileHeader: {
    background: 'linear-gradient(to right, #4F46E5, #9333EA)',
    padding: '16px',
    textAlign: 'center'
  },
  profileIconContainer: {
    display: 'inline-block',
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '8px',
    border: '4px solid white',
    marginBottom: '16px'
  },
  profileIcon: {
    height: '64px',
    width: '64px',
    color: '#4F46E5'
  },
  profileName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0'
  },
  profileId: {
    color: '#E0E7FF',
    margin: '4px 0 0 0'
  },
  profileDetails: {
    padding: '16px'
  },
  profileRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #F3F4F6'
  },
  profileRowLast: {
    borderBottom: 'none'
  },
  profileLabel: {
    color: '#6B7280'
  },
  profileValue: {
    fontWeight: '500'
  },
  greenText: {
    color: '#10B981',
    fontWeight: '500'
  },
  notificationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  notificationItem: {
    padding: '12px',
    borderLeft: '4px solid #4F46E5',
    backgroundColor: '#EEF2FF',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px'
  },
  notificationText: {
    fontSize: '14px',
    color: '#1F2937',
    margin: '0'
  },
  notificationTime: {
    fontSize: '12px',
    color: '#6B7280',
    marginTop: '4px'
  },
  overflowContainer: {
    overflowX: 'auto'
  },
  // Media query handling with inline styles
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
};


const Student = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data
  const progressData = [
    { subject: 'Math', completed: 78, goal: 100 },
    { subject: 'Science', completed: 65, goal: 100 },
    { subject: 'History', completed: 90, goal: 100 },
    { subject: 'English', completed: 82, goal: 100 },
    { subject: 'Art', completed: 95, goal: 100 },
  ];

  const attendanceData = [
    { name: 'Present', value: 85, color: '#10B981' },
    { name: 'Absent', value: 5, color: '#EF4444' },
    { name: 'Late', value: 10, color: '#F59E0B' },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Math Problem Set', dueDate: 'Feb 27', subject: 'Mathematics', priority: 'High' },
    { id: 2, title: 'History Essay', dueDate: 'Mar 2', subject: 'History', priority: 'Medium' },
    { id: 3, title: 'Science Lab Report', dueDate: 'Mar 5', subject: 'Science', priority: 'High' },
    { id: 4, title: 'English Literature Review', dueDate: 'Mar 7', subject: 'English', priority: 'Medium' },
  ];

  const notifications = [
    { id: 1, message: 'Your Math assignment has been graded: A', time: '2 hours ago' },
    { id: 2, message: 'New Science quiz scheduled for next week', time: '5 hours ago' },
    { id: 3, message: 'History group project deadline extended', time: '1 day ago' },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return styles.highPriority;
      case 'Medium': return styles.mediumPriority;
      case 'Low': return styles.lowPriority;
      default: return {};
    }
  };

  // Hover effect for table rows
  const [hoveredRow, setHoveredRow] = useState(null);
  return (
    <>
      <Sidebar />
      <Dashnav role="student" />
      <div style={styles.dashboard}>
      

      {/* Main Content */}
      <div style={isMobile ? styles.mobileContainer : styles.gridContainer}>
        {/* Left Column */}
        <div style={styles.column}>
          {/* Stats Cards */}
          <div style={styles.statsCardsGrid}>
            <div style={styles.statsCard}>
              <div style={{...styles.iconContainer, ...styles.blueIconContainer}}>
                <BookOpen style={styles.blueIcon} />
              </div>
              <div>
                <p style={styles.statsLabel}>Courses</p>
                <p style={styles.statsValue}>5</p>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={{...styles.iconContainer, ...styles.greenIconContainer}}>
                <CheckCircle style={styles.greenIcon} />
              </div>
              <div>
                <p style={styles.statsLabel}>Completed</p>
                <p style={styles.statsValue}>12/20</p>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={{...styles.iconContainer, ...styles.amberIconContainer}}>
                <Clock style={styles.amberIcon} />
              </div>
              <div>
                <p style={styles.statsLabel}>Hours</p>
                <p style={styles.statsValue}>42.5</p>
              </div>
            </div>
            
            <div style={styles.statsCard}>
              <div style={{...styles.iconContainer, ...styles.purpleIconContainer}}>
                <Award style={styles.purpleIcon} />
              </div>
              <div>
                <p style={styles.statsLabel}>GPA</p>
                <p style={styles.statsValue}>3.8</p>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Subject Progress</h2>
              <div style={{...styles.badge, ...styles.indigoBadge}}>
                Term Progress: 65%
              </div>
            </div>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#F9FAFB', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={40} name="Completed %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assignments Section */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Upcoming Assignments</h2>
              <div style={{...styles.badge, ...styles.blueBadge}}>
                View All
              </div>
            </div>
            <div style={styles.overflowContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Assignment</th>
                    <th style={styles.tableHeader}>Subject</th>
                    <th style={styles.tableHeader}>Due Date</th>
                    <th style={styles.tableHeader}>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAssignments.map((assignment) => (
                    <tr 
                      key={assignment.id} 
                      style={{
                        ...styles.tableRow,
                        backgroundColor: hoveredRow === assignment.id ? '#F9FAFB' : 'transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(assignment.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={styles.tableCell}>{assignment.title}</td>
                      <td style={styles.tableCell}>{assignment.subject}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.tableCellWithIcon}>
                          <Calendar style={styles.calendarIcon} />
                          {assignment.dueDate}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={getPriorityStyle(assignment.priority)}>
                          {assignment.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.column}>
          {/* Profile Card */}
          

          {/* Attendance Chart */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Attendance</h2>
              <div style={{...styles.badge, ...styles.greenBadge}}>
                85% Present
              </div>
            </div>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notifications */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Notifications</h2>
              <div style={{...styles.badge, ...styles.grayBadge}}>
                Clear All
              </div>
            </div>
            <div style={styles.notificationList}>
              {notifications.map((notification) => (
                <div key={notification.id} style={styles.notificationItem}>
                  <p style={styles.notificationText}>{notification.message}</p>
                  <p style={styles.notificationTime}>{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default Student;
