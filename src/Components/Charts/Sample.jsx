import React, { useState } from "react";
import "./Sample.css";
import Output from "../../Pages/Output";

const Sample = () => {
  const [selectedCard,setSelectedCard]=useState(1)
  return (
    <>
      <div className="container mt-4">
        {/* Top Metrics */}
        <div className="row g-4">
          {[
            { label: "Upcoming EMIs", className: "blue" },
            { label: "Over Due", className: "red" },
            { label: "Repayment Trends", className: "orange" },
          ].map((item, index) => (
            <div key={index} className="col-10 col-sm-4 mx-auto ms-sm-0" onClick={()=>setSelectedCard(index)}>
              <div className={`card text-white ${item.className} p-2`}>
                <div className="card-body text-center">
                  <h4 className="card-title">{item.value}</h4>
                  <p className="card-text">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
      <Output selectedCard={selectedCard} />
    </>
  );
};

export default Sample;
