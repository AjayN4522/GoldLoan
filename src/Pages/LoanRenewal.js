import React, { useState,useEffect} from "react";
import MenuBar from "../Components/MenuBar";
import '../Styles/LoanRenewal.css';
import Header from "../Components/Header";
import Renewals from '../json/LoanDetails.json';
import { flushSync } from "react-dom";
import Calculator from '../Components/Calculator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

function LoanRenewal() {


    const [menuVisible, setMenuVisible] = useState(true);


  const handleResize = () => {
    if (window.innerWidth > 1300) {
      setMenuVisible(true); 
    }
    if (window.innerWidth < 1300) {
        setMenuVisible(false); 
      }
  };



  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuVisible && window.innerWidth < 1300) {
      setMenuVisible(false);
    }
  };

    const toggleMenu = () => {
      setMenuVisible((prev) => !prev);
    };

    return (
        <div onClick={handleClickOutside} style={{position:"relative"}} className="LoanDetailsPage">
            <MenuBar isVisible={menuVisible} username="John" />
            <div className="Loan-Content">
                <Header onMenuToggle={toggleMenu} pageName="Loan Renewal" />
                <hr className="divider" />
                <Renewal />
            </div>
        </div>
    );
}

export default LoanRenewal;


function Renewal(){

    const [selectedRenewal,setSelectedRenewal] = useState(1);
    const [searchQuery, setSearchQuery] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tenure, setTenure] = useState(0); 
    const [Interest, setInterest] = useState(0); 

    const handleSliderChange = (event) => {
        if(event.target.name === "Tenure"){
            setTenure(event.target.value);
        }else{
            setInterest(event.target.value)
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleInputChange = (event) => {
        if(event.target.name === "Tenure"){
            setTenure(event.target.value);
        }else{
            setInterest(event.target.value)
        }
    };

    const filteredRenewalList = searchQuery 
        ? Renewals.filter(item =>
            item.RenewalID.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : Renewals;

    const changeRenewal = (i)=>{
        setSelectedRenewal(i);
}

    

    const formatDate = (dateInput) => {
        try {
          const date = new Date(dateInput);
          if (isNaN(date)) throw new Error('Invalid Date');
          
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
      
          return formattedDate.replace(/ /g, '-');
        } catch (error) {
          return 'Invalid Date';
        }
    };

    return <>
    <div className="RenewalDetailsMain">
        <button className="open-modal-btn" onClick={openModal}>
        <FontAwesomeIcon className="cal-icon" size="lg" icon={faCalculator}></FontAwesomeIcon>
      </button>
      {isModalOpen && <Calculator closeModal={closeModal} />}
        <div className="RenewalDetails-Left">
            <div className="RenewalDetails-Left-Header">
                <div className="Renewal-SearchMain">
                    <input className="Renewal-SearchBox" onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Loan ID" type="text"></input>
                    <button className="Renewal-SearchIcon"><i class="bi bi-search"></i></button>
                </div>
            </div>
            <div className="RenewalDetails-Group">
                <div className="RenewalContainers">
                    <p className="RenewalContainerLable">Customer</p>
                    <div className="RenewalCards">
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Name</label>
                            <input className="RenewalInputs" type="text" placeholder="Name"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Aadhar Number</label>
                            <input className="RenewalInputs" type="text" placeholder="Aadhar Number"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Nominee</label>
                            <input className="RenewalInputs" type="text" placeholder="Nominee"></input>
                        </div>
                    </div>
                </div>
                <div className="RenewalContainers">
                    <p className="RenewalContainerLable">Gold Details</p>
                    <div className="RenewalCards">
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Appraised Value</label>
                            <input className="RenewalInputs" type="text" placeholder="Appraised Value"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">No of Gold</label>
                            <input className="RenewalInputs" type="text" placeholder="No of Gold"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Gold Price</label>
                            <input className="RenewalInputs" type="text" placeholder="Gold Price"></input>
                        </div>
                    </div>
                </div>
                <div className="RenewalContainers">
                    <p className="RenewalContainerLable">Renewal</p>
                    <div className="RenewalCards">
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Loan Principal</label>
                            <input className="RenewalInputs" type="text" placeholder="Loan Principal"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Renewal Principal</label>
                            <input className="RenewalInputs" type="text" placeholder="Renewal Principal"></input>
                        </div>
                        <div className="RenewalCardDiv">
                            <label className="RenewalCardLable">Original Principal</label>
                            <input className="RenewalInputs" type="text" placeholder="Original Principal"></input>
                        </div>
                    </div>
                    <div className="RenewalCards">
                    <div className="RenewalCardDiv1">
                        <div className="RenewalCardDivSec">
                        <label className="RenewalCardLable">Renewal Interest</label>
                            <input id="renewalTenure" type="range" min="0" max="10" step="2.5" value={Interest} onChange={handleSliderChange} className="RenewalRangeSlider"/>
                            <div className="RenewalSliderLabels">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className="RenewalSliderLabel">
                                        {index * 2.5}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <input placeholder="1" className="RenewalInput" type="text" value={Interest} onChange={handleInputChange}/>
                    </div>
                    </div>
                    <div className="RenewalCards">
                    <div className="RenewalCardDiv1">
                        <div className="RenewalCardDivSec">
                        <label className="RenewalCardLable">Renewal Tenure</label>
                            <input id="renewalTenure" type="range" name="Tenure" min="0" max="12" step="3" value={tenure} onChange={handleSliderChange} className="RenewalRangeSlider"/>
                            <div className="RenewalSliderLabels">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className="RenewalSliderLabel">
                                        {index * 3}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <input placeholder="1" className="RenewalInput" type="text" value={tenure} onChange={handleInputChange}/>
                    </div>
                    </div>
                </div>
                <div className="RenewalContainers">
                    <p className="RenewalContainerLable">Document Upload</p>
                    <div className="RenewalCards">
                        <div className="RenewalCardDiv">
                            <label htmlFor="doc-uploads" className="gold-document-upload-button">
                              <i className="bi bi-file-earmark-arrow-up"></i>
                            </label>
                            <input id="doc-uploads" style={{ display: "none" }} type="file" name="goldDocuments" multiple />
                        </div>
                        <button className="RenewalSubmitButton" type="submit">Finish</button>
                    </div>
                </div>
               
            </div>
        </div>
        <div className="RenewalDetailsRight">
            <div className="RenewalDetailsRight-Group">
            <div className="RenewalDetailsRight-Header">
                <div className="Details-Group">
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].loan_id:""}</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].first_name:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Loan Approved Date</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].update_at:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Tenure End Date</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]? Renewals[selectedRenewal].tenure_end_date:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Loan Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].loan_amount:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Interest Rate</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].interest_rate:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Interest</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].interest:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Total Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].total_amount:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Amount Paid</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].amount_paid:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Balance Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].balance_amount:""}</p>
                </div>
            </div>
            <div className="RenewalDetailsRight-Info">
              <p className="RenewalPaymentLabel">Renewal</p>
                <div className="Details-Group">
                    <p className="Details-Label">Loan Renewed Date</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].update_at:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Renewal Tenure Date</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]? Renewals[selectedRenewal].tenure_end_date:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Renewal Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].loan_amount:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Renewal Interest</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].interest:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Total Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].total_amount:""}</p>
                </div>

            </div>
            <div className="RenewalDetailsRight-Info">
              <p className="RenewalPaymentLabel">Payment</p>
                <div className="Details-Group">
                    <p className="Details-Label">Additional Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].update_at:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Charges</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]? Renewals[selectedRenewal].tenure_end_date:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Disbursed Amount</p>
                    <p className="Details-Info">{Renewals[selectedRenewal]?Renewals[selectedRenewal].loan_amount:""}</p>
                </div>
            </div>
            </div>
            <div className="RenewalDetailsRight-Footer">
                <p className="PaymentHistoryLabel">Renewal History</p>
                <div className="Details-Group">
                    <p className="Details-Label">2-Jan-2025</p>
                    <p className="Details-Info">10,000</p>
                </div>
            </div>
        </div>
    </div>
    </>
}


