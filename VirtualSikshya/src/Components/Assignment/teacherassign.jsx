import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../../styles/teacherassign.css';

function AssignmentsManager({ teacher }) {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [errors, setErrors] = useState({});

  // Example Assignments
  const exampleAssignments = [
    {
      id: '101',
      title: '📌 AI Research Paper',
      description: 'Artificial Intelligence (AI) is transforming industries by enhancing automation, decision-making, and problem-solving. Recent advancements in machine learning, deep learning, and natural language processing have led to breakthroughs in healthcare, finance, and autonomous systems. However, ethical concerns such as bias, data privacy, and job displacement remain key challenges in AI development. Researchers are exploring explainable AI (XAI) and regulatory frameworks to ensure responsible AI deployment. The future of AI depends on balancing innovation with ethical considerations to maximize its benefits while minimizing risks.',
      deadline: '2025-03-10',
      department: 'ai',
      teacherId: 'T001',
      file: null,
      fileName: null,
      submissions: [],
    },
    {
      id: '102',
      title: '📊 Mathematics Quiz',
      description: 'Mathematics quizzes help students improve problem-solving skills by testing their understanding of arithmetic, algebra, and geometry. These quizzes often include multiple-choice questions that assess calculations, logical reasoning, and formula applications. Interactive quizzes with instant feedback enhance learning by identifying mistakes and reinforcing correct concepts. Implementing a scoring system encourages students to track their progress and strive for better performance. A well-designed mathematics quiz promotes engagement, critical thinking, and a deeper understanding of mathematical principles..',
      deadline: '2025-03-12',
      department: 'mathematics',
      teacherId: 'T002',
      file: null,
      fileName: null,
      submissions: [],
    },
    {
      id: '103',
      title: '💻 Ethics in Computing Report',
      description: 'Ethics in computing refers to the moral principles and guidelines that govern the responsible use of technology. As computing continues to evolve, ethical concerns such as privacy, security, and digital rights have become critical topics. Issues like data breaches, algorithmic bias, and the misuse of artificial intelligence raise questions about accountability and fairness. Organizations and developers are encouraged to follow ethical frameworks, such as the ACM Code of Ethics, to ensure responsible technology use. By prioritizing transparency, inclusivity, and data protection, computing professionals can foster trust and innovation while minimizing harm.',
      deadline: '2025-03-15',
      department: 'ethics',
      teacherId: 'T003',
      file: null,
      fileName: null,
      submissions: [],
    }
  ];

  // Load assignments from localStorage or set example assignments
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
    if (savedAssignments.length === 0) {
      setAssignments(exampleAssignments);
      localStorage.setItem('assignments', JSON.stringify(exampleAssignments));
    } else {
      setAssignments(savedAssignments);
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  // Department options
  const departmentOptions = [
    { value: 'computing', label: 'Computing' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'ethics', label: 'Ethics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';
    if (!department) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newAssignment = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      deadline,
      file: file ? URL.createObjectURL(file) : null,
      fileName: file ? file.name : null,
      department,
      teacherId: teacher ? teacher.id : 'unknown',
      submissions: []
    };

    setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
    setTitle('');
    setDescription('');
    setDeadline('');
    setFile(null);
    setDepartment('');
    setCreateMode(false);
    toast.success('Assignment Created Successfully ✅');
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      const updatedAssignments = assignments.filter(a => a.id !== id);
      setAssignments(updatedAssignments);
      localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
      toast.info('Assignment Deleted 🗑️');
    }
  };

  return (
    <div className="assignments-container">
      <div className="header">
        <h2>📚 Assignment Manager</h2>
        <button className="create-btn" onClick={() => setCreateMode(!createMode)}>
          {createMode ? 'Cancel' : '➕ Create Assignment'}
        </button>
      </div>

      {createMode ? (
        <div className="create-assignment">
          <h3>Create New Assignment</h3>
          <form onSubmit={handleCreateAssignment} className="form">
            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}

            <textarea
              placeholder="Assignment Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? 'error' : ''}
            ></textarea>
            {errors.description && <span className="error-text">{errors.description}</span>}

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={errors.deadline ? 'error' : ''}
            />
            {errors.deadline && <span className="error-text">{errors.deadline}</span>}

            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departmentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}

            <input type="file" onChange={handleFileChange} />
            {file && <p className="file-name">📎 {file.name}</p>}

            <button type="submit" className="submit-btn">Create Assignment</button>
          </form>
        </div>
      ) : (
        <div className="assignment-list">
          {assignments.length === 0 ? (
            <p className="no-data">No assignments created yet.</p>
          ) : (
            assignments.map(assignment => (
              <div key={assignment.id} className="assignment-card">
                <h4>{assignment.title}</h4>
                <p>{assignment.description}</p>
                <p><strong>📅 Due:</strong> {assignment.deadline}</p>
                <p><strong>📚 Department:</strong> {departmentOptions.find(d => d.value === assignment.department)?.label}</p>

                {assignment.file && (
                  <a href={assignment.file} target="_blank" rel="noopener noreferrer">
                    📂 {assignment.fileName}
                  </a>
                )}

                <div className="actions">
                  <button className="delete-btn" onClick={() => handleDeleteAssignment(assignment.id)}>❌ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AssignmentsManager;
