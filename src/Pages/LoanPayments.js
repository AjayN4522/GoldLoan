import React, { useState,useEffect} from "react";
import MenuBar from "../Components/MenuBar";
import '../Styles/LoanPayment.css';
import Header from "../Components/Header";
import Loans from '../json/LoanDetails.json';

function LoanPayment() {
    
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
                <Header onMenuToggle={toggleMenu} pageName="Loan Payment" />
                <hr className="divider" />
                <Loan />
            </div>
        </div>
    );
}

export default LoanPayment;


function Loan(){

    const [selectedLoan,setSelectedLoan] = useState(1);
    const [searchQuery, setSearchQuery] = useState();

    const filteredLoanList = searchQuery 
        ? Loans.filter(item =>
            item.loan_id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : Loans;

    const changeLoan = (i)=>{
        setSelectedLoan(i);
    }

    function calculateRemainingMonthsAndDays(date1, date2) {
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-');
            return new Date(`${month} ${day}, ${year}`);
        };
    
        const startDate = formatDate(date1);
        const endDate = formatDate(date2);
    
        if (startDate > endDate) {
            return "Start date cannot be after end date.";
        }
    
        let months = endDate.getMonth() - startDate.getMonth() +
                     12 * (endDate.getFullYear() - startDate.getFullYear());
        let days = endDate.getDate() - startDate.getDate();
    
        if (days < 0) {
            const prevMonth = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                0
            ).getDate();
            days += prevMonth;
            months--;
        }
    
        return months+"M "+days+"D Left";
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
                            <p className="List-pending">{calculateRemainingMonthsAndDays(items.update_at, items.tenure_end_date)}</p>
                            <div className="List-Buttons">
                            <button className="Loan-List-PayIcon">Pay</button>
                            <select className="Loan-List-CloseIcon">
                                <option className="closure-list">Close Loan</option>
                                <option className="closure-list">Regular Closure</option>
                                <option className="closure-list">Forced Closure</option>
                            </select>
                            </div>
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
                    <p className="Details-Label">Loan Approved Date</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].update_at:""}</p>
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
                <div className="Details-Group">
                    <p className="Details-Label">Amount Paid</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].amount_paid:""}</p>
                </div>
                <div className="Details-Group">
                    <p className="Details-Label">Balance Amount</p>
                    <p className="Details-Info">{Loans[selectedLoan]?Loans[selectedLoan].balance_amount:""}</p>
                </div>
            </div>
            <div className="LoanDetailsRight-Info">
              <p className="LoanPaymentLabel">Payment</p>
              <form className="LoanPaymentForm">
                <div className="LoanPaymentFormDiv1">
                    <input className="payment-inputs" type="number" placeholder="Amount"></input>
                    <input className="payment-inputs" type="date" placeholder="17-Jan-2025"></input>
                </div>
                <div className="LoanPaymentFormDiv1">
                    <select className="payment-inputs">
                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                    </select>
                    <select className="payment-inputs">
                        <option>Paid</option>
                        <option>Pending</option>
                    </select>
                </div>
                <button className="LoanPaymentPayBtn">Pay</button>
              </form>
            </div>
            </div>
            <div className="LoanDetailsRight-Footer">
                <p className="PaymentHistoryLabel">Payment History</p>
                <div className="Details-Group">
                    <p className="Details-Label">2-Jan-2025</p>
                    <p className="Details-Info">10,000</p>
                </div>
            </div>
        </div>
    </div>
    </>
}


