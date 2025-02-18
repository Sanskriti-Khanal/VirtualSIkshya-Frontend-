import React, { useState, useEffect } from 'react';
import "../../styles/form.css";

const StudentRegistration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNumber: '',
    batch: '',
    department: '',
    semester: '',
    section: '',
    parentName: '',
    parentPhone: '',
    address: '',
    profilePicture: null,
    previousEducation: {
      school: '',
      percentage: '',
      year: ''
    }
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Other'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const sections = ['A', 'B', 'C', 'D'];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const keys = name.split('.');
      if (keys.length === 2) {
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value
          }
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, profilePicture: file }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // Remove profile picture
  const handleRemoveProfilePicture = () => {
    setFormData(prevData => ({ ...prevData, profilePicture: null }));
    setProfilePreview(null);
  };

  // Cleanup blob URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  // Validate form fields
  const validateForm = () => {
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!phonePattern.test(formData.phone) || !phonePattern.test(formData.parentPhone)) {
      alert("Invalid phone number format. Please enter a 10-digit number.");
      return false;
    }

    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="student-registration">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            {/* Profile Picture Upload */}
            <div className="form-group">
              <label>Profile Picture</label>
              {profilePreview ? (
                <div className="profile-picture-preview">
                  <img src={profilePreview} alt="Profile Preview" className="profile-preview" />
                  <button type="button" onClick={handleRemoveProfilePicture} className="btn-remove">Remove</button>
                </div>
              ) : (
                <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} />
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Academic Details</h3>
            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Batch</label>
              <input type="text" name="batch" value={formData.batch} onChange={handleChange} required placeholder="e.g., 2023-27" />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Select Semester</option>
                {semesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select name="section" value={formData.section} onChange={handleChange} required>
                <option value="">Select Section</option>
                {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="form-layout">
          <div className="form-section">
            <h3>Previous Education</h3>
            <div className="form-group">
              <label>School/College Name</label>
              <input type="text" name="previousEducation.school" value={formData.previousEducation.school} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Percentage/CGPA</label>
              <input type="text" name="previousEducation.percentage" value={formData.previousEducation.percentage} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Passing Year</label>
              <input type="number" name="previousEducation.year" value={formData.previousEducation.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-section">
            <h3>Parent/Guardian Details</h3>
            <div className="form-group">
              <label>Parent/Guardian Name</label>
              <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Parent/Guardian Phone</label>
              <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-group">
            <label>Full Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"></textarea>
          </div>
        </div>

        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
