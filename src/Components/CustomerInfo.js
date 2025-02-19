import {React,useState} from "react";
import '../Styles/CustomerInfo.css';
import Customers from '../json/CustomerDetails.json';

const IdTypes = ["Aadhar ID", "Passport ID", "Voter ID", "PAN ID"];

const formatDate = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date)) throw new Error('Invalid Date');
      
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  
      // Replace the default space separator with hyphens
      return formattedDate.replace(/ /g, ' - ');
    } catch (error) {
      return 'Invalid Date';
    }
};

function CustomerInfo({ formData, setFormData, errors }) {
   
  const [searchQuery, setSearchQuery] = useState();
  const [searchAadharQuery, setSearchAadharQuery] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isAadharActive, setIsAadharActive] = useState(false);
  const [selectedCustomer,setSelectedCustomer] = useState();


  const handleAddCustomer = (item) => {
    if (item) {
      setFormData({
        ...formData,
        customer:[item],
      });
    }
    if (isAadharActive === true) handleToggle1();
    if (isActive === true ) handleToggle();
  };

  const handleAppendValue = (newValue) => {
    setFormData((prevFormData) => {

      const updatedCustomer = [...prevFormData.customer];
      if (updatedCustomer[0]) {
        updatedCustomer[0] = [...updatedCustomer[0], newValue];
      } else {
        updatedCustomer[0] = [newValue];
      }
      return {
        ...prevFormData,
        customer: updatedCustomer,
      };
    });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "nominee_name" || name === "nominee_relation"){
        if (/^[A-Za-z]+$/.test(value)){
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    }
    if(name === "nominee_aadhar"){
        if(value.length <=12){
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    }
};

  


  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleToggle1 = () => {
    setIsAadharActive(!isAadharActive);
  };

  const filteredCustomerList = searchQuery ? Customers.filter(item =>item.phone_number.includes(searchQuery)): Customers;
  const filteredAadharCustomerList = searchAadharQuery ? Customers.filter(item =>item.id_card_number.includes(searchAadharQuery)): Customers;


  return (
    <>
    <form className="customer-select-form"> 
      <div className="customer-select-header">
        <p className="step-head-label">Customer</p>
        <div className="customer-select-grps">
        <div className="customer-select-grp">
            <div className="customer-select" onClick={handleToggle}>
                <span className="phone-number-label">Phone Number</span>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div className="customer-search-content" style={{display: isActive ?"block" :"none"}}>
                <div className="search-customer">
                    <input className="customer-search-box" onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search" type="number"></input>
                </div>
                <ul className="customer-number">
                    {filteredCustomerList.map((items)=>{
                        return <li className="customer-number-each" onClick={()=>{setSelectedCustomer(items);handleAddCustomer(items)}}>{items.phone_number}</li>
                    })}
                </ul>
            </div>
        </div>
        <div className="customer-select-grp">
            <div className="customer-select" onClick={handleToggle1}>
                <span className="phone-number-label">Aadhar Number</span>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div className="customer-search-content" style={{display: isAadharActive ?"block" :"none"}}>
                <div className="search-customer">
                    <input className="customer-search-box" onChange={(e)=>setSearchAadharQuery(e.target.value)} placeholder="Search" type="number"></input>
                </div>
                <ul className="customer-number">
                    {filteredAadharCustomerList.map((items)=>{
                        return <li className="customer-number-each" onClick={()=>{setSelectedCustomer(items);handleAddCustomer(items)}}>{items.id_card_number}</li>
                    })}
                </ul>
            </div>
        </div>
        </div>
      </div>
      <div className="customer-select-field-grp">
        <div classNameName="customer-select-fields">
        <label className="Labels">First Name</label><br></br>
        <input type="text" name="first_name" readOnly value={formData?.customer[0]?.first_name ? formData.customer[0].first_name : selectedCustomer ? selectedCustomer.first_name : ""} className="customer-select-field"></input>
        </div>  
        <div classNameName="customer-select-fields">
        <label className="Labels">Last Name</label><br></br>
        <input type="text" name="last_name" readOnly value={formData?.customer[0]?.last_name ? formData.customer[0].last_name : selectedCustomer ? selectedCustomer.last_name : ""} className="customer-select-field"></input>
        </div>
        <div classNameName="customer-select-fields">
      <label className="Labels">Date of Birth</label><br></br>
        <input type="text" name="date_of_birth" readOnly value={formData?.customer[0]?.date_of_birth ? formatDate(formData.customer[0].date_of_birth) : selectedCustomer ? formatDate(selectedCustomer.date_of_birth) : ""} className="customer-select-field"></input>
        </div>
      </div>
      <div className="customer-select-field-grp">
        <div classNameName="customer-select-fields">
        <label className="Labels">Phone Number</label><br></br>
        <input type="text" name="phone_number" readOnly value={formData?.customer[0]?.phone_number ? formData.customer[0].phone_number : selectedCustomer ? selectedCustomer.phone_number : ""} className="customer-select-field"></input>
        </div>
        <div classNameName="customer-select-fields">
      <label className="Labels">Id Card Type</label><br></br>
        <input type="text" name="id_card_type" readOnly value={formData?.customer[0]?.id_card_type ? formData.customer[0].id_card_type : selectedCustomer ? selectedCustomer.id_card_type : ""} className="customer-select-field"></input>
        </div>
        <div classNameName="customer-select-fields">
        <label className="Labels">Id Card Number</label><br></br>
        <input type="text" name="id_card_number" readOnly value={formData?.customer[0]?.id_card_number ? formData.customer[0].id_card_number : selectedCustomer  ? selectedCustomer.id_card_number : ""} className="customer-select-field"></input>
        </div>
      </div>
      <div className="customer-select-field-lgrp">
      <div classNameName="customer-select-lfields">
      <label className="Labels">Address</label><br></br>
        <textarea type="text" name="address" readOnly value={formData?.customer[0]?.address ? formData.customer[0].address : selectedCustomer ? selectedCustomer.address : ""} className="customer-select-lfield"></textarea>
      </div>
      </div>
      <div className="customer-select-field-grp">
        <div classNameName="customer-select-fields">
        <label className="Labels">Nominee</label><br></br>
        <input type="text" name="nominee_name" onChange={(e)=>handleInputChange(e)} value={formData?.nominee_name ? formData.nominee_name : selectedCustomer ? selectedCustomer.nominee_name : ""} className="customer-select-field"></input>
        </div>
        <div classNameName="customer-select-fields">
      <label className="Labels">Relation</label><br></br>
        <input type="text" name="nominee_relation" onChange={(e)=>handleInputChange(e)} value={formData?.nominee_relation ? formData.nominee_relation : selectedCustomer ? selectedCustomer.nominee_relation : ""} className="customer-select-field"></input>
        </div>
        <div classNameName="customer-select-fields">
        <label className="Labels">Aadhar Number</label><br></br>
        <input type="number" name="nominee_aadhar" onChange={(e)=>handleInputChange(e)} value={formData?.nominee_aadhar ? formData.nominee_aadhar : selectedCustomer  ? selectedCustomer.nominee_aadhar : ""} className="customer-select-field"></input>
        </div>
      </div>
    </form>
    </>
  );
}

export default CustomerInfo;
