import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./OverViewMatrix.css";

const OverViewMatrix = () => {
  const [chartWidth, setChartWidth] = useState(getChartWidth());

  function getChartWidth() {
    if (window.innerWidth > 1024) return 330; // Desktop
    if (window.innerWidth > 767) return 300; // Tablet
    if (window.innerWidth > 480) return 300; // Mobile
    return 290; // Small screens
  }

  useEffect(() => {
    const handleResize = () => setChartWidth(getChartWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    labels: [
      "Total Loan Disbursed",
      "Active Loan Accounts",
      "Pending Loan Approvals",
      "Loan Default Rate",
    ],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontSize: chartWidth < 400 ? "10px" : "10px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            value: {
              fontSize: "14px",
              fontWeight: "bold",
              formatter: (val) => val.toLocaleString(),
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "12px",
              fontWeight: "bold",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString(),
            },
          },
        },
      },
    },
  };

  const seriesData = [100000, 25000, 30000, 45000];

  return (
    <div>
      <h1 className="demoHead text-center">OverView Matrix</h1>
    <div className="matrix Overview-Matrix mx-auto p-3">
      <ReactApexChart options={chartOptions} series={seriesData} type="donut" width={chartWidth} />
    </div>
    </div>
  );
};

export default OverViewMatrix;
