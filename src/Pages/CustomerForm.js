import React, { useEffect, useState } from "react";
import '../Styles/CustomerDetails.css';
import UploadIcon from '../svg/upload.svg';
import GoldGrowth from '../Images/goldbag.png';
import Gold from '../Images/handshake.png';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { GetCountries, GetState, GetCity,} from "react-country-state-city";
import axios from "axios";



const IdTypes = ["Aadhar ID", "Passport ID", "Voter ID", "PAN ID"];

const formatDate = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date)) throw new Error('Invalid Date');
      
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

      return formattedDate.replace(/ /g, ' - ');
    } catch (error) {
      return 'Invalid Date';
    }
};

function CustomerForm() {
   

    const [errors, setErrors] = useState({});

    const location = useLocation();
    const passedState = location.state;

    const [isDateInput, setIsDateInput] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [error, setError] = useState("");

 
    const fetchLocation = async () => {
      if (!formData.pincode && formData.pincode.length !== 6) {
        setError("Please enter a valid 6-digit PIN code.");
        console.log("Please enter a valid 6-digit PIN code.")
        return;
      }
  
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${formData.pincode}`);
        const data = response.data[0];
        if (data.Status === "Success") {
          setFormData({ ...formData,
            district :data.PostOffice[0].District,
            state :data.PostOffice[0].State,
            country :data.PostOffice[0].Country,
        })
          setError("");
        } else {
          setError("No data found for this PIN code.");
          setFormData({ ...formData,
            district : "",
            state :"",
            country :""
        })
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setFormData({ ...formData,
            district : "",
            state :"",
            country :""
        })
      }
    };

/*
    const [isCountryActive, setIsCountryActive] = useState(false);
    const [isStateActive, setIsStateActive] = useState(false);
    const [isCityActive, setIsCityActive] = useState(false);

    
    const [searchCountryQuery, setSearchCountryQuery] = useState();
    const [searchStateQuery, setSearchStateQuery] = useState();
    const [searchCityQuery, setSearchCityQuery] = useState();
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    */



    const [formData, setFormData] = useState({
        firstName:passedState?.customer?.firstName ? passedState.customer.firstName :"",
        lastName:passedState?.customer?.lastName ? passedState.customer.lastName : "",
        dob:passedState?.customer?.dob ? passedState.customer.dob: "",
        email:passedState?.customer?.email ? passedState.customer.email : "",
        address:passedState?.customer?.address ? passedState.customer.address : "",
        phoneNumber:passedState?.customer?.phoneNumber ? passedState.customer.phoneNumber : "",
        customerPhoto:passedState?.customer?.Photo ? passedState.customer.Photo : "",
        idType:passedState?.customer?.card ? passedState.customer.card : "",
        idCardNumber:passedState?.customer?.cardNumber ? passedState.customer.cardNumber : "",
        idPhoto: passedState?.customer?.idPhoto ? passedState.customer.idPhoto :"",
        pincode:passedState?.customer?.pincode ? passedState.customer.pincode : "",
        district:passedState?.customer?.district ? passedState.customer.district : "",
        state: passedState?.customer?.state ? passedState.customer.state :"",
        country: passedState?.customer?.country ? passedState.customer.country :""
    });
   
    useEffect(() => {
        if(formData.pincode.length === 6){
            fetchLocation();
        }
    }, [formData.pincode]);
  

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "first_name":
            case "last_name":
                if (!/^[A-Za-z]+$/.test(value)) {
                    error = `${name === "first_name" ? "First" : "Last"} Name invalid`;
                }
                break;
            case "date_of_birth":
                if (!value) {
                    error = "Date of birth is required";
                }
                break;
            case "email":
                if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    error = "Email invalid";
                }
                break;
            case "phone_number":
                if ((!/^\d[1-9][0-9]{8}$/.test(value)) || value[0] === "0") {
                    error = "Phone number invalid";
                }
                break;
            case "id_card_type":
                if (!IdTypes.includes(value)) {
                    error = "Invalid ID Type";
                }
                break;
            case "address":
                if (value.length >250) {
                        error = "Must be max 250 characters";
                    }
                    break;
            case "id_card_number":
                if (formData.idType === "Aadhar ID" && !/^\d{12}$/.test(value)) {
                    error = "Aadhar must be 12 digits";
                } else if (formData.idType === "Passport ID" && !/^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/.test(value)) {
                    error = "Invalid Passport format";
                } else if (formData.idType === "Voter ID" && !/^[A-Z]{3}\d{7}$/.test(value)) {
                    error = "Invalid Voter ID format";
                } else if (formData.idType === "PAN ID" && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value)) {
                    error = "Invalid PAN format";
                }
                break;
            case "customer_photo":
            case "id_card_photo":
                if (!value) {
                    error = `${name === "customer_photo" ? "Photo" : "ID Proof"} is required`;
                }
                break;
            case "pincode":
                if (!value) {
                    error = `Pincode is required`;
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === "first_name" || name === "last_name"){
            if (/^[A-Za-z]+$/.test(value)){
                const fieldValue = files ? files[0] : value;
                if (fieldValue && name === "customer_photo") {
                    const previewUrl = URL.createObjectURL(fieldValue);
                    setImagePreview(previewUrl);
                  }
        
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: fieldValue
                }));
        
                validateField(name, fieldValue);
            }
        }
        if(name === "pincode"){
            if(value.length <=6){
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value
                }));
                validateField(name, value);
            }
        }
        else{
            const fieldValue = files ? files[0] : value;
            if (fieldValue && name === "customer_photo") {
                const previewUrl = URL.createObjectURL(fieldValue);
                setImagePreview(previewUrl);
              }
    
            setFormData((prevData) => ({
                ...prevData,
                [name]: fieldValue
            }));
    
            validateField(name, fieldValue);
        }
    };


    const handleFocus = () => {
        setIsDateInput(true);
    };
    const handleFocus1 = () => {
        setIsDateInput(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((err) => !err) &&
            Object.values(formData).every((value) => value !== "");

        if (isValid) {
            console.log("Form Submitted", formData);
            alert("submited")
        } else {
            alert("Please Enter valid Information.");
        }
    };

    const triggerFileInput = (inputId) => {
        document.getElementById(inputId).click();
    };


    return (
        <div className="CustomerFormMain">
            <div className="CustomerFormLeft">
                <div className="CustomerFormHead">
                    <div className="CustomerFormHead-1">
                        <h1 className="FormHeading">Gold Loan Customer Registeration Form</h1>
                        <img className="FormHeadIcon" alt="" src={Gold}></img>
                    </div>
                    <div className="CustomerFormHead-2">
                        <input
                            id='customerPhotoInput'
                            style={{ display: 'none' }}
                            accept='image/*'
                            type="file"
                            onChange={handleChange}
                            name="customer_photo"
                        />
                        <FontAwesomeIcon  className="customerPhoto" size="lg" onClick={() => triggerFileInput('customerPhotoInput')} icon={faCamera} ></FontAwesomeIcon>
                        <img className="customer-photo" src={imagePreview} alt=""></img>
                    </div>
                </div>
            <form className="CustomerForm" onSubmit={handleSubmit}>
                <div className="CustomerForm-1">
                    <div className="Fields"><div className="feilds-with-err">
                        <label className="Labels">First Name</label>{errors.firstName && (<p className="error-message">{errors.firstName}</p>)}</div>
                        <i class="bi bi-person icon" style={{opacity:formData.firstName ? 0 : 1,}}></i>
                        <input
                            name="first_name" id="input-field"
                            className={errors.firstName ? "InputsText error-feild" : "InputsText"}
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Fields"><div className="feilds-with-err">
                        <label className="Labels">Last Name</label>{errors.lastName && (<p className="error-message">{errors.lastName}</p>)}</div>
                        <i class="bi bi-person icon"  style={{opacity:formData.lastName ? 0 : 1,}}></i>
                        <input
                            name="last_name"
                            className={errors.lastName ? "InputsText error-feild" :"InputsText"}
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>
                <div className="CustomerForm-1">
                    <div className="Fields"><div className="feilds-with-err">
                        <label className="Labels">Date of Birth</label>
                        {errors.dob && (<p className="error-message">{errors.dob}</p>)}</div>
                        <input placeholder='01 - Jan - 2000'
                         required type={isDateInput ? "date": 'text'}
                          onFocus={handleFocus} onBlur={handleFocus1}
                           readOnly={!isDateInput} 
                            value={formData.dob !== "" ? formatDate(formData.dob) : ""}
                            name="date_of_birth"
                            className={errors.dob ? "InputsText error-feild" :"InputsText"}
                            onChange={handleChange}
                        />
                    </div>
                
                <div className="Fields"><div className="feilds-with-err">
                    <label className="Labels">Phone Number</label>{errors.phoneNumber && (<p className="error-message">{errors.phoneNumber}</p>)}</div>
                    <i class="bi bi-telephone icon"  style={{opacity:formData.phoneNumber ? 0 : 1,}}></i>
                    <input
                        name="phone_number"
                        className={errors.phoneNumber ? "InputsText error-feild" :"InputsText"}
                        type="number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="CustomerForm-1">
                    <div className="Fields"><div className="feilds-with-err">
                        <label className="Labels">Aadhar Number</label>{errors.idCardNumber && (<p className="error-message">{errors.idCardNumber}</p>)}</div>
                        <i class="bi bi-credit-card-2-front icon"  style={{opacity:formData.idCardNumber ? 0 : 1,}}></i>
                        <input
                            name="id_card_number"
                            className={errors.idCardNumber ? "InputsText error-feild" :"InputsText"}
                            type="text"
                            value={formData.idCardNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="photoFields"><div className="feilds-with-err">
                    <label className="Labels">ID Proof</label>{errors.idPhoto && (<p className="error-message">{errors.idPhoto}</p>)}</div>
                    <div className="InputsText1">
                        <input
                            name="idPhoto"
                            className={errors.idPhoto ? "InputsText error-feild" :"PhotoInputs"}
                            type="text"
                            readOnly
                            value={formData.idPhoto?.name || ""}
                            onClick={() => triggerFileInput('idPhotoInput')}
                        />
                        <input
                            id='idPhotoInput'
                            style={{ display: 'none' }}
                            accept='image/*'
                            type="file"
                            onChange={handleChange}
                            name="id_card_photo"
                        />
                        <img
                            onClick={() => triggerFileInput('idPhotoInput')}
                            className="Photo-Logo"
                            src={UploadIcon}
                            alt="Upload"
                        />
                    </div>
                </div>
                </div>    
                <div className="full-Fields"><div className="feilds-with-err">
                    <label className="Labels">Email</label>{errors.email && (<p className="error-message">{errors.email}</p>)}</div>
                    <i class="bi bi-envelope icon"  style={{opacity:formData.email ? 0 : 1,}}></i>
                    <input
                        name="email"
                        className={errors.email? "InputsText error-feild" : "InputsText"}
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="full-Fields"><div className="feilds-with-err">
                    <label className="Labels">Address</label>{ errors.address ? <p className="error-message">{errors.address}</p> : <p className="error-message">{formData.address.length}/250</p>}</div>
                    <i class="bi bi-geo-alt icon" style={{opacity:formData.address ? 0 : 1,}}></i>
                    <input
                        name="address"
                        className={errors.address ?"InputsText error-feild" : "InputsText"}
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>  
                <div className="CustomerForm-1">
                    <div className="Fields"><div className="feilds-with-err">
                        <label className="Labels">Pin Code</label>
                        {errors.pincode && (<p className="error-message">{errors.pincode}</p>)}</div>
                        <input placeholder='Pin Code' type="text"
                            value={formData.pincode !== "" ? formData.pincode : ""}
                            name="pincode"
                            maxLength={6}
                            className={errors.pincode ? "InputsText error-feild" :"InputsText"}
                            onChange={handleChange}
                        />
                    </div>
                
                <div className="Fields"><div className="feilds-with-err">
                    <label className="Labels">District</label>{errors.district && (<p className="error-message">{errors.district}</p>)}</div>
                    <i class="bi bi-geo-alt icon"  style={{opacity:formData.district ? 0 : 1,}}></i>
                    <input
                        name="district"
                        className={errors.district ? "InputsText error-feild" :"InputsText"}
                        type="text"
                        value={formData.district}
                        onChange={handleChange}
                    />
                </div>
                <div className="Fields"><div className="feilds-with-err">
                    <label className="Labels">State / Country</label>{errors.stateCountry && (<p className="error-message">{errors.stateCountry}</p>)}</div>
                    <i class="bi bi-geo-alt icon"  style={{opacity:formData.state ? 0 : 1,}}></i>
                    <input
                        name="state"
                        className={errors.state ? "InputsText error-feild" :"InputsText"}
                        readOnly
                        value={formData.state? formData.state+" / "+formData.country : "" }
                        onChange={handleChange}
                    />
                </div>
                </div>   
                <div className="FooterButtons">
                    <div className="BtnGroup">
                        <Link style={{textDecoration:"none"}} to={"/CustomerDetails"}><button className="BackButton">Back</button></Link>
                        <button className="SubmitButton" type="submit">Finish</button>
                    </div>
                </div>
            </form>
            </div>
            <div className="CustomerFormRight">
                <img className="GoldGrowth" src={GoldGrowth} alt=""></img>
            </div>
        </div>
    );
}

export default CustomerForm;


/*
   
                <div className="CustomerForm-4">
                <div className="country-select-grp">
            <div className="country-select" onClick={handleCountryToggle}>
                <span className="phone-number-label">{country === "" ? "Country" :country}</span>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div className="country-search-content" style={{display: isCountryActive ?"block" :"none"}}>
                <div className="search-country">
                    <input className="country-search-box"
                    onChange={(e) => {
                        setSearchCountryQuery(e.target.value)
                      }}
                     placeholder="Search" type="text"></input>
                </div>
                <ul className="country-number">
                    {filteredCountries.map((items)=>{
                        return <li className="country-number-each"
                         onClick={()=>{
                         
                        setCountryid(items.id);
                        GetState(items.id).then((result) => {
                          setStateList(result);
                        });
                        setCountry(items.name);
                        handleCountryToggle()}}>{items.name}</li>
                    })}
                </ul>
            </div>
        </div> 
        <div className="country-select-grp">
            <div className="country-select" onClick={handleStateToggle}>
                <span className="phone-number-label">{state === "" ? "State" :state}</span>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div className="country-search-content" style={{display: isStateActive ?"block" :"none"}}>
                <div className="search-country">
                    <input className="country-search-box" 
                    onChange={(e) => {setSearchStateQuery(e.target.value)}}
                     placeholder="Search" type="text"></input>
                </div>
                <ul className="country-number">
                    {filteredStates?.map((items)=>{
                        return <li className="country-number-each"
                         onClick={()=>{
                        setStateid(items.id);
                        GetCity(countryid, items.id).then((result) => {
                          setCityList(result);
                        });
                        setState(items.name)
                        handleStateToggle()}}>{items.name}</li>
                    })}
                </ul>
            </div>
        </div> 
        <div className="country-select-grp">
            <div className="country-select" onClick={handleCityToggle}>
                <span className="phone-number-label">{city === "" ? "City" : city}</span>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div className="country-search-content" style={{display: isCityActive ?"block" :"none"}}>
                <div className="search-country">
                    <input className="country-search-box"
                     onChange={(e) => {setSearchCityQuery(e.target.value)}}
                     placeholder="Search" type="text"></input>
                </div>
                <ul className="country-number">
                    {filteredCity.map((items)=>{
                        return <li className="country-number-each" 
                        onClick={()=>{
                            setCityid(items.id);
                            setCity(items.name);
                            handleCityToggle()}}>{items.name}</li>
                    })}
                </ul>
            </div>
        </div> 
                </div>  
                */