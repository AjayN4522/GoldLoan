import {React,useState} from "react";
import '../Styles/GLTenure.css';
import { toWords } from "number-to-words";

function GLTenure({ formData, setFormData, errors }) {

  const [words, setWords] = useState("zero");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(name === "loanAmount"){
      handleConvert(value);
    }
  };

  function numberToIndianWords(num) {
    if (num === 0) return "zero";
  
    const ones = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
      "seventeen", "eighteen", "nineteen"
    ];
    const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];
  
    const scales = [
      "", "thousand", "lakh", "crore"
    ];
  
    function convertToWords(n) {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) {
        return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + convertToWords(n % 100) : "");
      }
      return "";
    }
  
    let result = "";
    let scaleIndex = 0;
  
    const parts = [];
    while (num > 0) {
      if (scaleIndex === 0) {
        parts.push(num % 1000); // First group is 3 digits
        num = Math.floor(num / 1000);
      } else {
        parts.push(num % 100); // Subsequent groups are 2 digits
        num = Math.floor(num / 100);
      }
      scaleIndex++;
    }
  
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i] !== 0) {
        result += (result ? " " : "") + convertToWords(parts[i]) + (scales[i] ? " " + scales[i] : "");
      }
    }
  
    return result.trim();
  }
  

  const handleConvert = (number) => {
    const num = parseInt(number, 10);
    if (!isNaN(num)) {
      setWords(numberToIndianWords(num));
    } else {
      setWords("Invalid number");
    }
  };


  return (
    <div className="Loan-tenure-main">
      <div className="loan-tenure-head">
      <p className="step-head-label">Loan Tenure</p>
      </div>
      <div className="loan-tenure-gold-details">
        <p className="gold-detail-footer-lables">Total Gold Items - <span className="gold-values">{formData.goldItem ? formData.goldItem :""}</span></p>
        <p className="gold-detail-footer-lables">Total Appraised Value - <span className="gold-values">{formData.totalAppraisedValue ? formData.totalAppraisedValue :""} </span></p>
        <p className="gold-detail-footer-lables">Total Gold Weight - <span className="gold-values">{formData.totalGoldWeight ? formData.totalGoldWeight :""} g</span></p>
      </div>
      <div className="loan-tenure-sections">
        <div className="loan-tenure-head">
          <div className="loan-tenure-with-text">
          <p className="loan-tenure-section-label">Loan Amount (₹)</p>
          <p className="loan-tenure-number-words">{words}</p>
          </div>
          <input className="loan-tenure-number-inputs" name="loanAmount" onChange={handleInputChange} value={formData.loanAmount ? formData.loanAmount :""} type="number"></input>
        </div>
        <div className="loan-tenure-amount">
        <div className="range-slider-container">
      <input
        type="range" name="loanAmount"
        min="0"
        max="1000000"
        style={{ background: `linear-gradient(to right, orange ${(Number(formData.loanAmount)/1000000)*100}%, #ddd ${(Number(formData.loanAmount)/1000000)*100}%)` }}
        value={formData.loanAmount ? formData.loanAmount :""}
        onChange={handleInputChange}
        className="range-slider"
      />
      <div className="labels">
        <span>0</span>
        <span>2.5L</span>
        <span>5L</span>
        <span>7.5L</span>
        <span>10L</span>
      </div>
    </div>
        </div>
      </div>
      <div class="loan-tenure-sections">
        <div className="loan-tenure-head">
        <p className="loan-tenure-section-label">Interest Rate</p>
        <input className="loan-tenure-number-inputs" name="interest" onChange={handleInputChange} value={formData.interest ? formData.interest :""} type="number"></input>
        </div>
        <div className="loan-tenure-amount">
        <div className="range-slider-container">
      <input
        type="range" name="interest"
        min="0"
        step={"0.5"}
        max="10"
        style={{ background: `linear-gradient(to right, orange ${(Number(formData.interest)/10)*100}%, #ddd ${(Number(formData.interest)/10)*100}%)` }}
        value={formData.interest ? formData.interest :""}
        onChange={handleInputChange}
        className="range-slider"
      />
      <div className="labels">
        <span>0</span>
        <span>2.5</span>
        <span>5</span>
        <span>7.5</span>
        <span>10</span>
      </div>
    </div>
        </div>
      </div>
      <div class="loan-tenure-sections">
      <div className="loan-tenure-head">
        <p className="loan-tenure-section-label">Loan Tenure (M)</p>
        <input className="loan-tenure-number-inputs"  name="loanTenure" onChange={handleInputChange} value={formData.loanTenure ? formData.loanTenure :""}  type="number"></input>
        </div>
        <div className="loan-tenure-amount">
        <div className="range-slider-container">
      <input
        type="range" name="loanTenure"
        min="0"
        max="12" style={{ background: `linear-gradient(to right, orange ${(Number(formData.loanTenure)/12)*100}%, #ddd ${(Number(formData.loanTenure)/12)*100}%)` }}
        value={formData.loanTenure ? formData.loanTenure :""} 
        onChange={handleInputChange}
        className="range-slider"
      />
      <div className="labels">
        <span>0</span>
        <span>3 Months</span>
        <span>6 Months</span>
        <span>9 Months</span>
        <span>12 Months</span>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default GLTenure;
