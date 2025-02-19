import React, { useState,useEffect } from "react";
import { ChromePicker } from "react-color";
import { useTheme } from "./ThemeContext";
import MenuBar from "../Components/MenuBar";
import '../Styles/ThemeSelector.css';
import Header from "../Components/Header";
import GoldType from "./MasterSetup/GoldType";
import NomineeRelation from "./MasterSetup/NomineeRelation";
import PaymentType from "./MasterSetup/PaymentMethod";
import ReferralType from "./MasterSetup/Referral";

// List of predefined fonts
const fonts = ["Arial", "Roboto", "Georgia", "Tahoma", "Verdana"];

const ThemeSelector = () => {

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


  return <div onClick={handleClickOutside} style={{position:"relative"}} className="LoanDetailsPage">
          <MenuBar isVisible={menuVisible} username="John" />
          <div className="Tenentcontent">
            <Header onMenuToggle={toggleMenu} pageName="Tenent Customize" />
            <hr className="divider" />
          <ThemeMain />
  </div>
</div>
};

export default ThemeSelector;



function ThemeMain (){

    
  const { theme, updateTheme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(theme.colors.background);
  const [primaryColor, setPrimaryColor] = useState(theme.colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(theme.colors.secondary);
  const [tertiaryColor, setTertiaryColor] = useState(theme.colors.tertiary);


  const [currentForm, setCurrentForm] = useState('goldType');
  const [isActive, setIsActive] = useState(0);



  const handleFontChange = (font) => {
    updateTheme({ ...theme, font });
  };

  const handlePrimaryChange = (color) => {
    setPrimaryColor(color.hex);// Generate tertiary color
    updateTheme({
      font: theme.font,
      colors: {
        background: backgroundColor,
        primary: color.hex,
        secondary: secondaryColor,
        tertiary: tertiaryColor,
      },
    });
  };

  const handleSecondaryChange = (color) => {
    setSecondaryColor(color.hex);
    updateTheme({
      font: theme.font,
      colors: {
        background: backgroundColor,
        primary: primaryColor,
        secondary: color.hex,
        tertiary: tertiaryColor, // Keep tertiary consistent
      },
    });
  };

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color.hex);
    updateTheme({
      font: theme.font,
      colors: {
        background: color.hex,
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: tertiaryColor, // Keep tertiary consistent
      },
    });
  };

  const handleTertiaryChange = (color) => {
    setTertiaryColor(color.hex);
    updateTheme({
      font: theme.font,
      colors: {
        background: backgroundColor,
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: color.hex, // Keep tertiary consistent
      },
    });
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'goldType':
        return <GoldType/>;
      case 'nomineeRelation':
        return <NomineeRelation/>;
      case 'referrals':
        return <ReferralType/>;
      case 'paymentMethod':
        return <PaymentType/>;
      default:
        return null;
    }
  };


  return <div className="Tenent-Customize">
            <div className='MasterSetupPageTabBox'>
              <button title='Gold Type' className= {isActive === 0 ? "MasterSetupPageTabBtns Active":"MasterSetupPageTabBtns"} onClick={()=>{setIsActive(0);setCurrentForm('goldType')}}> Gold Type </button>
              <button title='Nominee Relation' className= {isActive === 1 ? "MasterSetupPageTabBtns Active":"MasterSetupPageTabBtns"} onClick={()=>{setIsActive(1);setCurrentForm('nomineeRelation')}}>Nominee Relation</button>
              <button title='Referrals' className= {isActive === 2 ? "MasterSetupPageTabBtns Active":"MasterSetupPageTabBtns"} onClick={()=>{setIsActive(2);setCurrentForm('referrals')}}>Referrals</button>
              <button title='Payment Method' className= {isActive === 3 ? "MasterSetupPageTabBtns Active":"MasterSetupPageTabBtns"} onClick={()=>{setIsActive(3);setCurrentForm('paymentMethod')}}>Payment Method</button>
          </div>
          <div className='MasterSetupPageContent'>
              {renderForm()}
          </div>
          <div style={{ padding: "10px 20px" }}>
            <h3>Choose Font</h3>
            {fonts.map((font) => (
              <button key={font} style={{ fontFamily: font, margin: "5px 5px 30px 0" }} className="fonts" onClick={() => handleFontChange(font)}
              > {font}
              </button>
        ))}
        <h3>Choose Colours</h3>
  <div className="Colors-picker">
    <ChromePicker className="colorbox" styles={{width:"10px"}} color={backgroundColor} onChangeComplete={handleBackgroundChange} />
    <ChromePicker className="colorbox" color={primaryColor} onChangeComplete={handlePrimaryChange} />
    <ChromePicker className="colorbox" color={secondaryColor} onChangeComplete={handleSecondaryChange} />
    <ChromePicker className="colorbox" color={tertiaryColor} onChangeComplete={handleTertiaryChange} />
  </div>
</div>
  </div>
  
}



