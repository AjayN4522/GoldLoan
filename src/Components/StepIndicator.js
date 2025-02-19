import React from "react";
import '../Styles/StepIndicator.css';

function StepIndicator({ currentStep, totalSteps, steps }) {
  return (
    <>
    <div className="Steps-Left">
    <div className="Steps-Label-Head">
       {/*<p className="Steps-Label"><span>4  </span>Steps</p>
       <p className="Steps-Label-sm">to get a</p>*/}
       <p className="Steps-Label">Gold Loan</p>
    </div>
    <div className="step-indicator-main">
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`step ${currentStep > index ? "completed" : ""} ${
            currentStep === index ? "active" : ""
          }`}
        >
          <div className="step-number">{index+1}</div> 
          {index < totalSteps - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
    <div className="step-indicator-1">
        <p className={`steps ${currentStep > 0 ? "completed" : ""} ${currentStep === 0 ? "active" : ""}`}>{steps[0]}</p>
        <p className={`steps ${currentStep > 1 ? "completed" : ""} ${currentStep === 1 ? "active" : ""}`}>{steps[1]}</p>
        <p className={`steps ${currentStep > 2 ? "completed" : ""} ${currentStep === 2 ? "active" : ""}`}>{steps[2]}</p>
        <p className={`steps ${currentStep > 3 ? "completed" : ""} ${currentStep === 3 ? "active" : ""}`}>{steps[3]}</p>
    </div>
    </div>
    </div>
    </>
  );
}

export default StepIndicator;
