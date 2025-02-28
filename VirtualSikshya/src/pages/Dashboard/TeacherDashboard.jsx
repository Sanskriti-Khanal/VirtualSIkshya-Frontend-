import React, { useState, useContext } from "react";
import { DarkModeContext } from '../../Components/Darkmode';
import Dashnav from "../../Components/Dashnav";
import Sidebar from "../../Components/Sidebar/TeacherSidebar";
import { Bar, Pie } from "react-chartjs-2";
import Modal from "react-modal";
import "../../styles/teacherDashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import RoutineTable from "../../Components/Routine/RoutineTable";
import Eventcalendar from "../../Components/Events/Teachereve";
import Chart from "../../Components/chart";

// Import and register required Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

Modal.setAppElement("#root");

const TeacherDashboard = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [showGraph, setShowGraph] = useState(false);
  const [graphType, setGraphType] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingInput, setEditingInput] = useState("");

  const studentData = {
    labels: ["Ethical", "AI", "Computing"],
    datasets: [
      {
        label: "Number of Students",
        data: [5000, 12000, 9288],
        backgroundColor: ["#3D5A80", "#3D5A80", "#3D5A80"],
        borderWidth: 1,
      },
    ],
  };

  const teacherData = {
    labels: ["Ethical", "AI", "Computing"],
    datasets: [
      {
        label: "Number of Teachers",
        data: [10, 20, 15],
        backgroundColor: ["#3D5A80", "#4c6b99", "#e3f2fd"],
        borderWidth: 1,
      },
    ],
  };

  const showModal = (type) => {
    setGraphType(type);
    setShowGraph(true);
  };

  const hideModal = () => setShowGraph(false);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask(""); // Clear input after adding
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingInput(tasks[index]);
  };

  const handleSaveEditTask = () => {
    if (editingInput.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editingInput;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingInput("");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Dashnav role="teacher" />
        <div className="dashboard-content">
          <div className="dashboard-row">
            <div className="stats-card" onClick={() => showModal("studentStats")}>
              <h5>Students</h5>
              <h2>26,288</h2>
              
            </div>

            <div className="stats-card" onClick={() => showModal("teacherStats")}>
              <h5>Teachers</h5>
              <h2>45</h2>
            </div>


            <div className="dashboard-card todo-card">
              <h5>Todo List</h5>
              <input
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={handleAddTask}>Add</button>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editingInput}
                          onChange={(e) => setEditingInput(e.target.value)}
                        />
                        <button onClick={handleSaveEditTask}>Save</button>
                      </>
                      
                    ) : (
                      <>
                        <span>{task}</span>
                        <button className="edit-btn" onClick={() => handleEditTask(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteTask(index)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
            <Eventcalendar />
              <div className="calendar-grid">{/* Calendar Grid */}</div>
            </div>
          </div>

          <div className="dashboard-row two">
            
             
              <table className="routine-table">
              <RoutineTable />
              </table>
            
       

            
          
              <Chart />
        
            <div className="dashboard-card half-width">
              <h5>Announcements</h5>
              <div className="announcement">
                <h6>Parent-Teacher Meeting</h6>
                <p>Scheduled for next Friday at 3 PM</p>
              </div>
              <div className="announcement">
                <h6>Annual Sports Day</h6>
                <p>Preparations begin next week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showGraph}
        onRequestClose={hideModal}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="modal-content">
          <h2>{graphType === "studentStats" ? "Student Statistics" : "Teacher Statistics"}</h2>
          <button className="close-button" onClick={hideModal}>
            Close
          </button>
          {graphType === "studentStats" ? (
            <Bar data={studentData} />
          ) : (
            <div className="pie-chart-wrapper">
              <Pie
                data={teacherData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // This is key to controlling size
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
    
  );
};

export default TeacherDashboard; 