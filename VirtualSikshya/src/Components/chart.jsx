import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/teacherDashboard.css"


ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const studentPerformanceData = {
    labels: ["Excellent", "Good", "Average", "Poor"],
    datasets: [
      {
        label: "Performance Distribution",
        data: [30, 45, 20, 5], // Example data percentages
        backgroundColor: ["#3D5A80", "#98C1D9", "#E0FBFC", "#EE6C4D"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboard-card half-width">
      <h5>Student Performance</h5>
      <div className="chart-container">
        <Doughnut 
          data={studentPerformanceData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export default Chart;
