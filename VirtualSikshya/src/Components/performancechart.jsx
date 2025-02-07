import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", attendance: 92, assignments: 85 },
    { month: "Feb", attendance: 88, assignments: 90 },
    { month: "Mar", attendance: 95, assignments: 92 },
];

const PerformanceChart = () => {
    return (
        <div className="chart-container">
            <h3>Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
                    <Line type="monotone" dataKey="assignments" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceChart;
