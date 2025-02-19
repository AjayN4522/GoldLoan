import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SplineChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: 'Loan Disbursed',
        data: [50000, 60000, 55000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false, // Removes zoom and extra icons
        },
      },
      title: {
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Loan Amount',
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val.toLocaleString()} USD`,
        },
      },
    },
  });

  return (
    <div id="chart">
      <h1 className='demoHead text-center'>Loan Disbursement Trends</h1>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
};

export default SplineChart;
