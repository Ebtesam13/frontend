import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChartComponent({ data }) {
  return (
    <ResponsiveContainer>
      <LineChart data={data} width="100%" height="250px">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#ff6384" />
      </LineChart>
    </ResponsiveContainer>
  );
}
