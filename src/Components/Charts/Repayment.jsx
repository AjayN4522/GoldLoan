import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Repayment.css";

const Repayment = () => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.9);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", repaid: 4000, pending: 2000 },
    { month: "Feb", repaid: 4500, pending: 1800 },
    { month: "Mar", repaid: 4800, pending: 1500 },
    { month: "Apr", repaid: 5000, pending: 1400 },
    { month: "May", repaid: 5200, pending: 1300 },
    { month: "Jun", repaid: 5300, pending: 1200 },
    { month: "Jul", repaid: 4000, pending: 2000 },
    { month: "Aug", repaid: 4500, pending: 1800 },
    { month: "Sep", repaid: 4800, pending: 1500 },
    { month: "Oct", repaid: 5000, pending: 1400 },
    { month: "Nov", repaid: 5200, pending: 1300 },
    { month: "Dec", repaid: 5300, pending: 1200 },
  ];

  return (
    <div className="mt-3 repayment-container">
      <h2 className="tableMainHeading text-center text-lg-start">Repayment Trends</h2>
      <div className="Output1 col-12">
        <div className="repaymentMain">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={chartWidth} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip animationDuration={300} />
              <Legend />
              <Bar dataKey="repaid" fill="#2196F3" name="Repaid Amount" barSize={40} animationDuration={1200} />
              <Bar dataKey="pending" fill="#211951" name="Pending Amount" barSize={40} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Repayment;