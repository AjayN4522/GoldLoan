import React, { useEffect, useState } from "react";
import "../Styles/AgentAndBranchTable.css";

const AgentAndBranchTable = () => {
  const data = [
    { branch_name: "Downtown Branch", loan: 50000, agent: "Alice Johnson" },
    { branch_name: "Uptown Branch", loan: 75000, agent: "Robert Smith" },
    { branch_name: "Westside Branch", loan: 62000, agent: "David Lee" },
    { branch_name: "Eastside Branch", loan: 89000, agent: "Sophia Martinez" },
    { branch_name: "Central Branch", loan: 103000, agent: "James Anderson" },
    { branch_name: "Southside Branch", loan: 67000, agent: "Olivia Brown" },
    { branch_name: "Northside Branch", loan: 54000, agent: "Michael Davis" },
    { branch_name: "Lakeside Branch", loan: 92000, agent: "Emma Wilson" },
    { branch_name: "Hillside Branch", loan: 81000, agent: "William Thomas" },
    { branch_name: "Riverside Branch", loan: 97000, agent: "Isabella Taylor" },
  ];

  const [branch, setBranch] = useState([]);
  const [agent, setAgent] = useState([]);

  return (
    <div className=" col-12 mt-5 d-flex flex-sm-row flex-column justify-content-sm-around justify-content-center align-items-sm-start align-items-center mb-5">
      <div className="col-sm-5 col-10 mt-sm-0 mt-3">
        <h1 className="tableMainHeading mt-sm-0 mt-3 text-sm-start text-center">Best Performing Branch</h1>
        <div className="tb1">
          <table className="table table-bordered table-hover tb1 mt-3">
            <thead>
              <tr >
                <th className="tableHeading">Branch</th>
                <th className="tableHeading">Loan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => {
                return (
                  <tr className="upComingEmiTable">
                    <td className="tableData tableAgentName py-2 px-2">
                      {d.branch_name}
                    </td>
                    <td className="tableData ">{d.loan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-sm-5 col-10 mt-sm-0 mt-3">
        <h1 className="tableMainHeading mt-sm-0 mt-3 text-sm-start text-center">Best Performing Agent</h1>
        <div className="tb2">
          <table className="table table-bordered table-hover tb2 mt-3">
            <thead>
              <tr>
                <th className="tableHeading">Agent</th>
                <th className="tableHeading">Branch</th>
                <th className="tableHeading">Loan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => {
                return (
                  <tr className="upComingEmiTable">
                    <td className="tableData tableAgentName">{d.agent}</td>
                    <td className="tableData">{d.branch_name}</td>
                    <td className="tableData fw-bold ">{d.loan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentAndBranchTable;
