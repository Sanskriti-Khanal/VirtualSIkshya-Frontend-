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
    currentBatches: [],
    profilePicture: null,
  });

  const [editingEducationIndex, setEditingEducationIndex] = useState(null); // Track which education item is being edited
  const [editingBatchIndex, setEditingBatchIndex] = useState(null); // Track which batch item is being edited

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Other'];
  const faculties = ['Engineering', 'Science', 'Arts', 'Commerce'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        profilePicture: file,
      }));
    }
  };

  const handleRemoveProfilePicture = () => {
    setFormData(prevData => ({
      ...prevData,
      profilePicture: null,
    }));
  };

  // Education CRUD Functions
  const handleEducationAdd = (e) => {
    e.preventDefault();
    const newEducation = {
      degree: formData.degree,
      university: formData.university,
      year: formData.graduationYear,
    };

    if (editingEducationIndex !== null) {
      // Update existing education item
      const updatedEducation = [...formData.education];
      updatedEducation[editingEducationIndex] = newEducation;
      setFormData(prevData => ({
        ...prevData,
        education: updatedEducation,
        degree: '',
        university: '',
        graduationYear: '',
      }));
      setEditingEducationIndex(null); // Reset editing index
    } else {
      // Add new education item
      setFormData(prevData => ({
        ...prevData,
        education: [...prevData.education, newEducation],
        degree: '',
        university: '',
        graduationYear: '',
      }));
    }
  };

  const handleEducationEdit = (index) => {
    const education = formData.education[index];
    setFormData(prevData => ({
      ...prevData,
      degree: education.degree,
      university: education.university,
      graduationYear: education.year,
    }));
    setEditingEducationIndex(index); // Set the index of the item being edited
  };

  const handleEducationDelete = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      education: updatedEducation,
    }));
  };

  // Current Batches CRUD Functions
  const handleBatchAdd = (e) => {
    e.preventDefault();
    const newBatch = {
      batchName: formData.batchName,
      year: formData.batchYear,
      subject: formData.batchSubject,
    };

    if (editingBatchIndex !== null) {
      // Update existing batch item
      const updatedBatches = [...formData.currentBatches];
      updatedBatches[editingBatchIndex] = newBatch;
      setFormData(prevData => ({
        ...prevData,
        currentBatches: updatedBatches,
        batchName: '',
        batchYear: '',
        batchSubject: '',
      }));
      setEditingBatchIndex(null); // Reset editing index
    } else {
      // Add new batch item
      setFormData(prevData => ({
        ...prevData,
        currentBatches: [...prevData.currentBatches, newBatch],
        batchName: '',
        batchYear: '',
        batchSubject: '',
      }));
    }
  };

  const handleBatchEdit = (index) => {
    const batch = formData.currentBatches[index];
    setFormData(prevData => ({
      ...prevData,
      batchName: batch.batchName,
      batchYear: batch.year,
      batchSubject: batch.subject,
    }));
    setEditingBatchIndex(index); // Set the index of the item being edited
  };

  const handleBatchDelete = (index) => {
    const updatedBatches = formData.currentBatches.filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      currentBatches: updatedBatches,
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
        <div className="form-layout">
          {/* Personal Details Section */}
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
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
                placeholder="Email"
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
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Picture Section */}
            <div className="form-group">
              <label>Profile Picture</label>
              {formData.profilePicture ? (
                <div className="profile-picture-preview">
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile Preview"
                    className="profile-preview"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveProfilePicture}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              )}
            </div>
          </div>

          {/* Professional Details Section */}
          <div className="form-section">
            <h3>Professional Details</h3>
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                placeholder="Employee Id"
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
                placeholder='Specilization'
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
                placeholder="Experience in months"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="form-layout">
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
            <button onClick={handleEducationAdd} className="btn-add">
              {editingEducationIndex !== null ? 'Update Education' : 'Add Education'}
            </button>
          </div>
          <div className="education-list">
            {formData.education.map((edu, index) => (
              <div key={index} className="education-item">
                {edu.degree} - {edu.university} ({edu.year})
                <button onClick={() => handleEducationEdit(index)} className="btn-edit">Edit</button>
                <button onClick={() => handleEducationDelete(index)} className="btn-delete">Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Batches Section */}
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
            <button onClick={handleBatchAdd} className="btn-add">
              {editingBatchIndex !== null ? 'Update Batch' : 'Add Batch'}
            </button>
          </div>
          <div className="batch-list">
            {formData.currentBatches.map((batch, index) => (
              <div key={index} className="batch-item">
                {batch.batchName} - {batch.year} ({batch.subject})
                <button onClick={() => handleBatchEdit(index)} className="btn-edit">Edit</button>
                <button onClick={() => handleBatchDelete(index)} className="btn-delete">Delete</button>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Register Button */}
        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;