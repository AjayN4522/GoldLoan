/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import StepIndicator from "../Components/StepIndicator";
import Step1 from "../Components/CustomerInfo";
import Step2 from "../Components/GoldDetails";
import Step3 from "../Components/GLTenure";
import Step4 from "../Components/GLDocumentUpload";
import step2Image from '../Images/gold-stone-video.mp4';
import '../Styles/GoldLoanForm.css';
import User from '../svg/user-circle.svg';
import Customers from '../json/CustomerDetails.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const totalSteps = 4;
const steps = ["Customer","Gold Details","Loan Tenure","Documents"];

function GoldLoanForm() {

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState();

  const goldRate = 7300;

  const [formData, setFormData] = useState({
    goldDetails: [],
    customer: [],
    nomineeAadharNumber:"",
    nomineeName:"",
    nomineeRelation:"",
    goldItem: 0,
    totalAppraisedValue: 0,
    totalGoldWeight: 0,
    loanTenure: "0",
    loanAmount:"0",
    interest:"0",
    reference:"",
    document:""
  });
  const [uploadedFiles, setUploadedFiles] = useState(formData.uploadedDocuments || []);

  useEffect(() => {
    if (formData.uploadedDocuments) {
      setUploadedFiles(formData.uploadedDocuments);
    }
  }, [formData.uploadedDocuments]);

  const handleRemoveFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);

    setFormData({ ...formData, uploadedDocuments: newFiles });
  };


  const validateStep = (currentStep) => {
    const stepErrors = {};
    switch (currentStep) {
      case 1:
        return (formData.customer.length > 0 && formData.nomineeName !== "" &&  formData.nomineeRelation !== "" && formData.nomineeAadharNumber !== "") ; 
      case 2:
        return formData.goldDetails.length >0;
      case 3:
        return formData.proof !== "";
      case 4:
        return formData.proof !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if(validateStep(currentStep)){
      setCurrentStep(currentStep + 1);
    }else{
      alert(errors);
    }
  };

  const prevStep = () => {
    if(currentStep === 1){

    }else{
      setCurrentStep(currentStep - 1);
    }
  }


  const handleSubmit = () => {
    if (validateStep()) {
      alert("Form submitted successfully!");
      console.log("Submitted Data:", formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <StepIndicator currentStep={currentStep-1} totalSteps={totalSteps} steps={steps} />
      <hr></hr>
      <div className="form-panel">
        {renderStep()}
        <div className="form-navigation">
        <div className="form-navigation-grp">
        {currentStep <= 1 && (
            <button className="BackButton" onClick={prevStep}>Back</button>
          )}
          {currentStep > 1 && (
            <button className="BackButton" onClick={prevStep}>Previous</button>
          )}
          {currentStep < totalSteps && (
            <button  className="SubmitButton" onClick={nextStep}>Next</button>
          )}
          {currentStep === totalSteps && (
            <button  className="SubmitButton" onClick={handleSubmit}>Submit</button>
          )}
        </div>
        </div>
      </div>
      {currentStep === 4 ?
      <div className="DocDetailsRightSide">
        <div className="uploaded-files-list">
          <p className="upload-doc-label"> Uploaded Documents</p>
          {uploadedFiles.length <= 0 ? <p className="no-doc-label">No Document Exits</p> :
        uploadedFiles.map((file, index) => (
          <div key={index} className="uploaded-file-item">
            <span>{file.name}</span>
            <button
              type="button"
              className="remove-file-button"
              onClick={() => handleRemoveFile(index)}
            >
              <FontAwesomeIcon size="sm" icon={faTrash}></FontAwesomeIcon>
            </button>
          </div>
        ))}
      </div>
      </div>
        :
        <></>
      }
      {currentStep === 3 ?
      <div className="loan-tenure-cal-container">
        <div className="loan-tenure-cal-center-container">
            <p className="upload-doc-label">Loan Calculation</p>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Total Gold </p> <p className="loan-cal-val">{formData.totalAppraisedValue}</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Market Value (g) </p><p className="loan-cal-val">{goldRate}</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Total Value </p><p className="loan-cal-val">{formData.totalAppraisedValue * goldRate}</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Eligible Loan Amount</p><p className="loan-cal-val">{formData.loanAmount}</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Document Charges </p><p className="loan-cal-val">50</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Appraiser Fee</p><p className="loan-cal-val">500 </p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Disbursed  amount</p><p className="loan-cal-val">{formData.loanAmount - 550}</p>
            </div>
            <div className="loan-cal-card">
            <p className="loan-cal-labels">Annual Interest</p><p className="loan-cal-val">{((formData.loanAmount * (formData.loanTenure /12) * formData.interest)/100).toFixed(2)} </p>
            </div>
        </div>

      </div>
        :<></>
      }
      {currentStep === 2 ?
      <div className="gold-loan-right-container">
        <video className="gold-loan-right-img" autoPlay loop ><source src={step2Image} type="video/mp4" /></video>
      </div>:
      <></>
      }
      {currentStep === 1 && formData.customer.length > 0 ? 
      <div className="CustomerDetailsRightSide">
      <div className="CustomerDetailsRight-Group">
      <div className="CustomerDetailsRight-Header">
          <img className="Customer-Photo" src={User} alt=""></img>
          <p className="Customer-Name-Label">{formData.customer[0]?formData.customer[0].firstName + " " +formData.customer[0].lastName :""}</p>
      </div>
      <div className="CustomerDetailsRight-Info">
          <p className="Customer-Info-Label">Loan History</p>
          {Customers.map((items)=>{
            if(items.phone_number === formData.customer[0].phone_number)
              return <div>{items.goldLoans.map((items)=>{
                return <div className="loan-history-items">
                      <p className="loan-id">{items.loanId}</p>
                      <p className="loan-status" style={{color:items.status === "Active" ? "#59C147" :items.status === "Closed" ? "#FB4141" :items.status === "Defaulted" ? "#FF8E62" : ""}} >{items.status}</p>
                </div>;
              })}</div>;
          })}
      </div>
      </div>
      </div>
      : 
      <></>}
    </div>
  );
}

export default GoldLoanForm;

/*
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
<input className="loan-cal-feilds" type="number"></input>
*/