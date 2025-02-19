import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import "./Sample2.css";
import SplineChart from "./SplineChart";
import OverViewMatrix from "./OverViewMatrix";

const Sample2 = () => {
  const [goldCurrentPrice, setGoldCurrentPrice] = useState(100880);

  return (
    <div className="dashboard-container-2 col-12 mt-lg-5 mt-2">
      <div className="row">

        <div className="stats-card col-12 col-lg-3 d-flex flex-column align-items-center justify-content-center mx-auto">
          <h3>Live Gold Price</h3>
          <h1>&#8377; {goldCurrentPrice}</h1>
          <p>Get Gold Price</p>
          <button className="summary-btn">Price</button>
        </div>

        <div className="col-10 col-sm-5 col-lg-4 mt-lg-0 mt-4  mx-auto px-2 px-lg-0">
          <SplineChart />
        </div>

        <div className="overcol-10 col-sm-5 col-lg-3 mt-lg-0 mt-4 mx-auto">
          <OverViewMatrix />
        </div>

      </div>
    </div>
  );
};

export default Sample2;
