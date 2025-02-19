import React from "react";
import '../Styles/MenuBar.css';
import Logo from "../Images/goldlogo.png";
import DashboardIcon from '../svg/dashboard.svg';
import CustomerIcon from '../svg/user-circle.svg';
import AccountIcon from '../svg/user-card.svg';
import GoldLoanIcon from '../svg/goldloan.svg';
import ApplicationIcon from '../svg/pages.svg';
import PaymentIcon from '../svg/rupee.svg';
import DropDownIcon from '../svg/dropdown.svg';
import { Link } from "react-router-dom";

function MenuBar (props){

const MenuLists = [
    {name:"Dashboard",icon:DashboardIcon,path:"/DashBoard"},
    {name:"Customer Details",icon:CustomerIcon,path:"/CustomerDetails"},
    {name:"Renewal",icon:AccountIcon,path:"/LoanRenewal"},
    {name:"Gold Loan",icon:GoldLoanIcon,path:"/GoldLoanForm"},
    {name:"Loan Approval",icon:ApplicationIcon,path:"/LoanApproval"},
    {name:"Payment",icon:PaymentIcon,path:"/LoanPayment"}
]
    return <>
        <div className = "MenuBarContainer" style={{display: props.isVisible ? "flex" : "none" }}>
            <div className = "MenuBarSubContainer-1">
                <div className="Company">
                    <img className ="goldLogo" alt=""src={Logo}></img>
                    <p className="Company-Name">Instant Loan</p>
                </div>
                <div className="Menu">
                    {MenuLists.map((i)=>{
                        return <Link to={i.path} className="Menu-items my-auto">                        
                         {<img className ="linked-logo" alt="" src={i.icon}></img>}
                            <p className="Menu-Links">{i.name}</p>
                        </Link>
                    })}
                </div>
            </div>
            <div className = "MenuBarSubContainer-2">
                <div className="MenuBarSubContainer-2-0">
                <img className ="profile-logo" alt="" src={CustomerIcon}></img>
                <div className="UserProfileBox">
                    <p className="user-name">John</p>
                    <p className="view-profile">View Profile</p>
                </div>
                </div>
                <img className ="link-logo1" alt="" src={DropDownIcon}></img>
            </div>
        </div>
    </>
}

export default MenuBar;

