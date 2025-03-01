import React, { useState, useEffect } from "react";
import "../../styles/ProfileDashboard.css";

const ProfileSelection = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    faculty: "ethical",
    id: "",
    specialization: "",
    course: "",
    year: "",
  });

  // Load mock profiles on component mount
  useEffect(() => {
    const mockProfiles = [
      { id: 1, type: "student", name: "Ram Khatri", faculty: "computing", year: "3", course: "Computer Science", avatar: "👨‍🎓" },
      { id: 2, type: "student", name: "Sita Sharma", faculty: "ai", year: "2", course: "Artificial Intelligence", avatar: "👩‍🎓" },
      { id: 3, type: "teacher", name: "Dr. Bhandari", faculty: "ethical", specialization: "Ethics in Technology", avatar: "👨‍🏫" },
      { id: 4, type: "teacher", name: "Prof. Shrestha", faculty: "computing", specialization: "Software Engineering", avatar: "👩‍🏫" },
      { id: 5, type: "student", name: "Bikash Thapa", faculty: "ethical", year: "1", course: "Ethics and Computing", avatar: "🧑‍🎓" },
      { id: 6, type: "teacher", name: "Dr. Mahato", faculty: "ai", specialization: "Machine Learning", avatar: "👨‍🏫" },
    ];
    setProfiles(mockProfiles);
  }, []);

  // Handle faculty filter change
  const handleFacultyChange = (e) => setSelectedFaculty(e.target.value);

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      id: profiles.length + 1,
      type: formType,
      name: formData.name,
      faculty: formData.faculty,
      avatar: formType === "student" ? "🧑‍🎓" : "👨‍🏫",
      ...(formType === "student"
        ? { year: formData.year, course: formData.course }
        : { specialization: formData.specialization }),
    };
    setProfiles([...profiles, newProfile]);
    setShowForm(false);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ name: "", email: "", faculty: "ethical", id: "", specialization: "", course: "", year: "" });
  };

  // Delete profile
  const deleteProfile = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfiles(profiles.filter((profile) => profile.id !== id));
    }
  };

  // Filter profiles based on selected faculty
  const filteredProfiles = profiles.filter(
    (profile) => selectedFaculty === "all" || profile.faculty === selectedFaculty
  );

  return (
    <div className="profile-container">
      <div className="header">
        <h1>👥 Profile Management</h1>
      
      </div>

      {/* Filter and Add Button */}
      <div className="controls">
        <div className="filter">
          <label>Filter by Faculty:</label>
          <select value={selectedFaculty} onChange={handleFacultyChange}>
            <option value="all">All Faculties</option>
            <option value="ethical">Ethical</option>
            <option value="computing">Computing</option>
            <option value="ai">AI</option>
          </select>
        </div>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "➕ Add New"}
        </button>
      </div>

      {/* Form for Adding Profiles */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="profile-form">
          <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
          <select name="faculty" value={formData.faculty} onChange={handleFormChange} required>
            <option value="ethical">Ethical</option>
            <option value="computing">Computing</option>
            <option value="ai">AI</option>
          </select>
          <select name="type" value={formType} onChange={(e) => setFormType(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {formType === "student" ? (
            <>
              <input type="text" name="course" value={formData.course} onChange={handleFormChange} placeholder="Course" required />
              <input type="text" name="year" value={formData.year} onChange={handleFormChange} placeholder="Year" required />
            </>
          ) : (
            <input type="text" name="specialization" value={formData.specialization} onChange={handleFormChange} placeholder="Specialization" required />
          )}
          <button type="submit">✅ Create Profile</button>
        </form>
      )}

      {/* Profile Display */}
      <div className="profiles">
        <h2>🎓 Students</h2>
        <ul>
          {filteredProfiles
            .filter((p) => p.type === "student")
            .map((profile) => (
              <li key={profile.id}>
                {profile.avatar} {profile.name} - {profile.course}
                <button className="delete-button" onClick={() => deleteProfile(profile.id)}>❌</button>
              </li>
            ))}
        </ul>

        <h2>🏫 Teachers</h2>
        <ul>
          {filteredProfiles
            .filter((p) => p.type === "teacher")
            .map((profile) => (
              <li key={profile.id}>
                {profile.avatar} {profile.name} - {profile.specialization}
                <button className="delete-button" onClick={() => deleteProfile(profile.id)}>❌</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSelection;
