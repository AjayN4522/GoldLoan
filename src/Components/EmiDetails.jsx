import React from "react";
import "../Styles/EmiDetails.css";

const EmiDetails = () => {
  const data = [
    {
      branch_name: "Downtown Branch",
      loan: 5000,
      agent: "Alice Johnson",
      date: "2025-02-10",
    },
    {
      branch_name: "Uptown Branch",
      loan: 7500,
      agent: "Robert Smith",
      date: "2025-02-11",
    },
    {
      branch_name: "Westside Branch",
      loan: 6200,
      agent: "David Lee",
      date: "2025-02-12",
    },
    {
      branch_name: "Eastside Branch",
      loan: 8900,
      agent: "Sophia Martinez",
      date: "2025-02-13",
    },
    {
      branch_name: "Central Branch",
      loan: 10300,
      agent: "James Anderson",
      date: "2025-02-14",
    },
    {
      branch_name: "Southside Branch",
      loan: 6700,
      agent: "Olivia Brown",
      date: "2025-02-15",
    },
    {
      branch_name: "Northside Branch",
      loan: 5400,
      agent: "Michael Davis",
      date: "2025-02-16",
    },
    {
      branch_name: "Lakeside Branch",
      loan: 9200,
      agent: "Emma Wilson",
      date: "2025-02-17",
    },
    {
      branch_name: "Hillside Branch",
      loan: 8100,
      agent: "William Thomas",
      date: "2025-02-18",
    },
    {
      branch_name: "Riverside Branch",
      loan: 9700,
      agent: "Isabella Taylor",
      date: "2025-02-19",
    },
  ];

  return (
    <div className="col-12 mt-3">
      <h1 className="tableMainHeading text-center text-lg-start">Next 7 Days EMI Payer Details</h1>
      <div className="Output2 col-12">
        <table className=" text-center text-lg-start table table-bordered text-center table-hover">
          <thead>
            <tr>
              <th className="tableHeading">Customer</th>
              <th className="tableHeading">EMI</th>
              <th className="tableHeading">Upcoming EMI date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              return (
                <tr key={index} className="upComingEmiTable">
                  <td className="tableData tableAgentName py-2 px-2">
                    {d.agent}
                  </td>
                  <td className="tableData ">{d.loan}</td>
                  <td className="tableData ">{d.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmiDetails;
