import React from 'react';
import '../Styles/Header.css';
import Logo from "../Images/goldlogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuBar from './MenuBar';


function Header(props){
    return <>
    <div className="Header">
        <div className="Page-div">
            <FontAwesomeIcon className="header-bar"  onClick={props.onMenuToggle} icon={faBars}></FontAwesomeIcon>
            <p className="Page-name">{props.pageName}</p>
        </div>
        <div className="Company-h">
            <img className ="logo-h" alt=""src={Logo}></img>
            <p className="Company-Name-h">Instant Loan</p>
        </div>
    </div>
    </>
}

export default Header;


