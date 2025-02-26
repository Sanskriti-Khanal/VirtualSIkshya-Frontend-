import React, { useState, useEffect } from 'react';
import '../styles/ProfileDashboard.css';

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

  useEffect(() => {
    const fetchProfiles = async () => {
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

  const handleFacultyChange = (e) => setSelectedFaculty(e.target.value);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      id: profiles.length + 1,
      type: formType,
      name: formData.name,
      faculty: formData.faculty,
      avatar: formType === 'student' ? '🧑‍🎓' : '🧑‍🏫',
      ...(formType === 'student' ? { year: formData.year, course: formData.course } : { specialization: formData.specialization }),
    };
    setProfiles([...profiles, newProfile]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', faculty: 'ethical', id: '', specialization: '', course: '', year: '' });
  };

  const filteredProfiles = profiles.filter(profile => selectedFaculty === 'all' || profile.faculty === selectedFaculty);
  const studentProfiles = filteredProfiles.filter(profile => profile.type === 'student');
  const teacherProfiles = filteredProfiles.filter(profile => profile.type === 'teacher');

  return (
    <div className="profile-selection-container">
      <div className="header-section">
        <h1>Profile Selection</h1>
        <p className="tagline">Choose your academic identity</p>
      </div>
      <div className="controls-section">
        <div className="faculty-filter">
          <span>Filter by Faculty:</span>
          <select value={selectedFaculty} onChange={handleFacultyChange}>
            <option value="all">All Faculties</option>
            <option value="ethical">Ethical</option>
            <option value="computing">Computing</option>
            <option value="ai">AI</option>
          </select>
        </div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="profile-form">
          <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
          <select name="faculty" value={formData.faculty} onChange={handleFormChange} required>
            <option value="ethical">Ethical</option>
            <option value="computing">Computing</option>
            <option value="ai">AI</option>
          </select>
          {formType === 'student' ? (
            <>
              <input type="text" name="id" value={formData.id} onChange={handleFormChange} placeholder="Student ID" required />
              <input type="text" name="course" value={formData.course} onChange={handleFormChange} placeholder="Course" required />
              <input type="text" name="year" value={formData.year} onChange={handleFormChange} placeholder="Year" required />
            </>
          ) : (
            <>
              <input type="text" name="id" value={formData.id} onChange={handleFormChange} placeholder="Teacher ID" required />
              <input type="text" name="specialization" value={formData.specialization} onChange={handleFormChange} placeholder="Specialization" required />
            </>
          )}
          <button type="submit">Create Profile</button>
        </form>
      )}
      <div className="profiles-container">
        <h2>Students</h2>
        <ul>
          {studentProfiles.map(profile => (
            <li key={profile.id}>{profile.avatar} {profile.name} - {profile.course}</li>
          ))}
        </ul>
        <h2>Teachers</h2>
        <ul>
          {teacherProfiles.map(profile => (
            <li key={profile.id}>{profile.avatar} {profile.name} - {profile.specialization}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSelection;
