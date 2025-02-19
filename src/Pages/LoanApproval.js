import React, { useState,useEffect} from "react";
import MenuBar from "../Components/MenuBar";
import '../Styles/LoanPayment.css';
import '../Styles/LoanApproval.css';
import Header from "../Components/Header";
import Loans from '../json/LoanDetails.json';

function LoanApproval() {
  
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
                <Header  onMenuToggle={toggleMenu} pageName="Loan Approval" />
                <hr className="divider" />
                <Loan />
            </div>
        </div>
    );
}

export default LoanApproval;


function Loan(){

    const [selectedLoan,setSelectedLoan] = useState(1);
    const [searchQuery, setSearchQuery] = useState();
    const [isDateInput, setIsDateInput] = useState(false);


    const [formData, setFormData] = useState({
      approvalDate:"",
      approvalStatus: ""    ,
      remarks: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};

    const filteredLoanList = searchQuery 
        ? Loans.filter(item =>
            item.loan_id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : Loans;

    const changeLoan = (i)=>{   
        setSelectedLoan(i);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted", formData);
      alert("submited")
  };

  const handleFocus = () => {
    setIsDateInput(true);
};
const handleFocus1 = () => {
    setIsDateInput(false);
};
    

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
    <div className="LoanDetailsMain">
        <div className="LoanDetails-Left">
            <div className="LoanDetails-Left-Header">
                <div className="Loan-SearchMain">
                    <input className="Loan-SearchBox" onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Loan ID" type="text"></input>
                    <button className="Loan-SearchIcon"><i class="bi bi-search"></i></button>
                </div>
            </div>
            <div className="LoanDetails-Group">
                {filteredLoanList.length <= 0 ? <p className="NullLoans">No Loans Exists</p> :
                filteredLoanList.map((items,i)=>{
                    return <div className="Loan-List" onClick={()=>changeLoan(i)}>
                            <p className="List-Id">{items.loan_id}</p>
                            <p className="List-name">{items.first_name}</p>
                            <p className="List-approveddate">{items.update_at}</p>
                            <p className="List-pending">{ items.tenure_end_date}</p>
                            <p className="Loan-aprove-status"> Pending </p>
                    </div>
                })}
            </div>
        </div>
        <div className="LoanDetailsRight">
            <div className="LoanDetailsRight-Group">
            <div className="LoanDetailsRight-Header">
                <div className="Details-Group">
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].loan_id:""}</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].first_name:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Tenure End Date</p>
                    <p className="Details-Info">{Loans[selectedLoan]? Loans[selectedLoan].tenure_end_date:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Loan Amount</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].loan_amount:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Interest Rate</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].interest_rate:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Interest</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].interest:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Total Amount</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].total_amount:""}</p>
                </div>
            </div>
            <div className="LoanDetailsRight-Info">
              <p className="LoanPaymentLabel">Approval</p>
              <form className="LoanPaymentForm">
                <div className="LoanPaymentFormDiv1">
                    <input className="payment-inputs" required type={isDateInput ? "date": 'text'}  onFocus={handleFocus} onBlur={handleFocus1} readOnly={!isDateInput}  name="update_at" value={formatDate(formData.approvalDate)} onChange={handleChange} placeholder="17-Jan-2025"></input>
                    <select className="payment-inputs" name="loan_status" value={formData.approvalStatus} onChange={handleChange} >
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                </div>
                <div className="LoanPaymentFormDiv1">
                  <textarea className="approval-inputs" name="remarks" value={formData.remarks} onChange={handleChange} type="text" placeholder="Remarks"></textarea> 
                </div>
                <button className="LoanPaymentPayBtn" onClick={handleSubmit}>Done</button>
              </form>
            </div>
            </div>
        </div>
    </div>
    </>
}


