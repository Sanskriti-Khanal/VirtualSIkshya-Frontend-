import React, { useState, useEffect } from 'react';
import './ProfileDashboard.css';

const ProfileSelection = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    faculty: 'ethical',
    id: '',
    specialization: '',
    course: '',
    year: '',
    avatar: '',
  });

  // Simulating database fetch
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchProfiles = async () => {
      // Mock data - in a real app, this would come from your database
      const mockProfiles = [
        { id: 1, type: 'student', name: 'John Doe', faculty: 'computing', year: '3', course: 'Computer Science', avatar: '👨‍🎓' },
        { id: 2, type: 'student', name: 'Jane Smith', faculty: 'ai', year: '2', course: 'Artificial Intelligence', avatar: '👩‍🎓' },
        { id: 3, type: 'teacher', name: 'Dr. Brown', faculty: 'ethical', specialization: 'Ethics in Technology', avatar: '👨‍🏫' },
        { id: 4, type: 'teacher', name: 'Prof. Zhang', faculty: 'computing', specialization: 'Software Engineering', avatar: '👩‍🏫' },
        { id: 5, type: 'student', name: 'Alex Johnson', faculty: 'ethical', year: '1', course: 'Ethics and Computing', avatar: '🧑‍🎓' },
        { id: 6, type: 'teacher', name: 'Dr. Garcia', faculty: 'ai', specialization: 'Machine Learning', avatar: '👨‍🏫' },
      ];
      
      setProfiles(mockProfiles);
    };
    
    fetchProfiles();
  }, []);

  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to your backend
    console.log('Submitting profile:', formType, formData);
    
    // Simulate adding to the list
    const newProfile = {
      id: profiles.length + 1,
      type: formType,
      name: formData.name,
      faculty: formData.faculty,
      avatar: formType === 'student' ? '🧑‍🎓' : '🧑‍🏫',
      ...(formType === 'student' 
        ? { year: formData.year, course: formData.course } 
        : { specialization: formData.specialization })
    };
    
    setProfiles([...profiles, newProfile]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      faculty: 'ethical',
      id: '',
      specialization: '',
      course: '',
      year: '',
    });
  };

  const openForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const getFacultyIcon = (faculty) => {
    switch(faculty) {
      case 'ethical': return '🔍';
      case 'computing': return '💻';
      case 'ai': return '🤖';
      default: return '📚';
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    selectedFaculty === 'all' || profile.faculty === selectedFaculty
  );

  const studentProfiles = filteredProfiles.filter(profile => profile.type === 'student');
  const teacherProfiles = filteredProfiles.filter(profile => profile.type === 'teacher');

  return (
    <div className="profile-selection-container">
      <div className="header-section">
        <div className="header-bg"></div>
        <h1>Profile Selection</h1>
        <p className="tagline">Choose your academic identity</p>
      </div>
      
      <div className="controls-section">
        <div className="faculty-filter">
          <span>Filter by Faculty:</span>
          <div className="custom-select">
            <select 
              id="faculty-select" 
              value={selectedFaculty} 
              onChange={handleFacultyChange}
            >
              <option value="all">All Faculties</option>
              <option value="ethical">Ethical</option>
              <option value="computing">Computing</option>
              <option value="ai">AI</option>
            </select>
            <div className="select-arrow"></div>
          </div>
        </div>

        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          <span className="button-icon">{showForm ? '✕' : '+'}</span>
          <span className="button-text">{showForm ? 'Cancel' : 'Add New'}</span>
        </button>
      </div>
      
      {showForm && (
        <div className="profile-form-container">
          <div className="form-header">
            <h2>Create New {formType === 'student' ? 'Student' : 'Teacher'} Profile</h2>
          </div>

          <div className="form-type-selector">
            <button 
              className={`type-button ${formType === 'student' ? 'active' : ''}`}
              onClick={() => setFormType('student')}
            >
              <span className="button-icon">👨‍🎓</span>
              Student
            </button>
            <button 
              className={`type-button ${formType === 'teacher' ? 'active' : ''}`}
              onClick={() => setFormType('teacher')}
            >
              <span className="button-icon">👨‍🏫</span>
              Teacher
            </button>
          </div>

          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleFormChange} 
                placeholder="Enter your full name"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleFormChange} 
                placeholder="Enter your email address"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="faculty">Faculty</label>
              <div className="custom-select">
                <select 
                  id="faculty" 
                  name="faculty" 
                  value={formData.faculty} 
                  onChange={handleFormChange} 
                  required
                >
                  <option value="ethical">Ethical</option>
                  <option value="computing">Computing</option>
                  <option value="ai">AI</option>
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>

            {formType === 'student' ? (
              <>
                <div className="form-group">
                  <label htmlFor="id">Student ID</label>
                  <input 
                    type="text" 
                    id="id" 
                    name="id" 
                    value={formData.id} 
                    onChange={handleFormChange} 
                    placeholder="Enter your student ID"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course">Course</label>
                  <input 
                    type="text" 
                    id="course" 
                    name="course" 
                    value={formData.course} 
                    onChange={handleFormChange} 
                    placeholder="Enter your course name"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year of Study</label>
                  <input 
                    type="text" 
                    id="year" 
                    name="year" 
                    value={formData.year} 
                    onChange={handleFormChange} 
                    placeholder="Enter your year of study"
                    required 
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="id">Teacher ID</label>
                  <input 
                    type="text" 
                    id="id" 
                    name="id" 
                    value={formData.id} 
                    onChange={handleFormChange} 
                    placeholder="Enter your teacher ID"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <input 
                    type="text" 
                    id="specialization" 
                    name="specialization" 
                    value={formData.specialization} 
                    onChange={handleFormChange} 
                    placeholder="Enter your specialization"
                    required 
                  />
                </div>
              </>
            )}

            <button type="submit" className="submit-button">
              <span className="button-icon">✓</span>
              <span className="button-text">Create Profile</span>
            </button>
          </form>
        </div>
      )}

      <div className="profiles-container">
        <div className="profile-section">
          <div className="section-header">
            <h2>
              <span className="section-icon">👨‍🎓</span>
              Student Profiles
            </h2>
            <div className="section-count">{studentProfiles.length}</div>
          </div>
          
          {studentProfiles.length === 0 ? (
            <div className="no-profiles">
              <div className="empty-icon">🔍</div>
              <p>No student profiles found</p>
            </div>
          ) : (
            <div className="profile-cards">
              {studentProfiles.map(profile => (
                <div key={profile.id} className={`profile-card faculty-${profile.faculty}`}>
                  <div className="profile-card-header">
                    <div className="avatar">{profile.avatar}</div>
                    <div className="faculty-badge">{getFacultyIcon(profile.faculty)}</div>
                  </div>
                  <div className="profile-card-body">
                    <h3>{profile.name}</h3>
                    <div className="profile-detail">
                      <span className="detail-label">Faculty:</span>
                      <span className="detail-value">{profile.faculty.charAt(0).toUpperCase() + profile.faculty.slice(1)}</span>
                    </div>
                    <div className="profile-detail">
                      <span className="detail-label">Year:</span>
                      <span className="detail-value">{profile.year}</span>
                    </div>
                    <div className="profile-detail">
                      <span className="detail-label">Course:</span>
                      <span className="detail-value">{profile.course}</span>
                    </div>
                  </div>
                  <div className="profile-card-footer">
                    <button className="select-button">
                      <span className="button-text">Select Profile</span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>
              <span className="section-icon">👨‍🏫</span>
              Teacher Profiles
            </h2>
            <div className="section-count">{teacherProfiles.length}</div>
          </div>
          
          {teacherProfiles.length === 0 ? (
            <div className="no-profiles">
              <div className="empty-icon">🔍</div>
              <p>No teacher profiles found</p>
            </div>
          ) : (
            <div className="profile-cards">
              {teacherProfiles.map(profile => (
                <div key={profile.id} className={`profile-card faculty-${profile.faculty}`}>
                  <div className="profile-card-header">
                    <div className="avatar">{profile.avatar}</div>
                    <div className="faculty-badge">{getFacultyIcon(profile.faculty)}</div>
                  </div>
                  <div className="profile-card-body">
                    <h3>{profile.name}</h3>
                    <div className="profile-detail">
                      <span className="detail-label">Faculty:</span>
                      <span className="detail-value">{profile.faculty.charAt(0).toUpperCase() + profile.faculty.slice(1)}</span>
                    </div>
                    <div className="profile-detail">
                      <span className="detail-label">Specialization:</span>
                      <span className="detail-value">{profile.specialization}</span>
                    </div>
                  </div>
                  <div className="profile-card-footer">
                    <button className="select-button">
                      <span className="button-text">Select Profile</span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;