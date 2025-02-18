// TeacherRegistration.js
import React, { useState } from 'react';
import "../../styles/form.css";

const TeacherRegistration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    faculty: '',
    specialization: '',
    experience: '',
    teachingSubjects: [],
    education: [],
    currentBatches: []
  });

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Other'];
  const faculties = ['Engineering', 'Science', 'Arts', 'Commerce'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBatchAdd = (e) => {
    e.preventDefault();
    const newBatch = {
      batchName: formData.batchName,
      year: formData.batchYear,
      subject: formData.batchSubject
    };
    
    setFormData(prevData => ({
      ...prevData,
      currentBatches: [...prevData.currentBatches, newBatch],
      batchName: '',
      batchYear: '',
      batchSubject: ''
    }));
  };

  const handleEducationAdd = (e) => {
    e.preventDefault();
    const newEducation = {
      degree: formData.degree,
      university: formData.university,
      year: formData.graduationYear
    };

    setFormData(prevData => ({
      ...prevData,
      education: [...prevData.education, newEducation],
      degree: '',
      university: '',
      graduationYear: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="teacher-registration">
      <h2>Teacher Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Details</h3>
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select 
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Faculty</label>
            <select 
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Education</h3>
          <div className="education-inputs">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
            />
            <input
              type="text"
              name="university"
              placeholder="University"
              value={formData.university}
              onChange={handleChange}
            />
            <input
              type="number"
              name="graduationYear"
              placeholder="Year"
              value={formData.graduationYear}
              onChange={handleChange}
            />
            <button onClick={handleEducationAdd} className="btn-add">Add Education</button>
          </div>
          <div className="education-list">
            {formData.education.map((edu, index) => (
              <div key={index} className="education-item">
                {edu.degree} - {edu.university} ({edu.year})
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Current Batches</h3>
          <div className="batch-inputs">
            <input
              type="text"
              name="batchName"
              placeholder="Batch Name"
              value={formData.batchName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="batchYear"
              placeholder="Year"
              value={formData.batchYear}
              onChange={handleChange}
            />
            <input
              type="text"
              name="batchSubject"
              placeholder="Subject"
              value={formData.batchSubject}
              onChange={handleChange}
            />
            <button onClick={handleBatchAdd} className="btn-add">Add Batch</button>
          </div>
          <div className="batch-list">
            {formData.currentBatches.map((batch, index) => (
              <div key={index} className="batch-item">
                {batch.batchName} - {batch.year} ({batch.subject})
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;