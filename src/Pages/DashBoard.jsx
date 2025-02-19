import React, { useState, useEffect } from "react";
import MenuBar from "../Components/MenuBar";
import "../Styles/DashBoard.css";
import Header from "../Components/Header";
import Sample from "../Components/Charts/Sample";
import Sample2 from "../Components/Charts/Sample2";

import CustomerBorrow from "../Components/CustomerBorrow";
import AgentAndBranchTable from "../Components/AgentAndBranchTable";

function DashBoardDetails() {
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
    <div
      onClick={handleClickOutside}
      style={{ position: "relative" }}
      className="DashBoardDetailsPage"
    >
      <MenuBar isVisible={menuVisible} username="John" />
      <div className="DashBoard-Content">
        <Header onMenuToggle={toggleMenu} pageName="DashBoard" />
        <hr className="divider" />
        <DashBoard />
      </div>
    </div>
  );
}

export default DashBoardDetails;

function DashBoard() {
  return (
    <div className="col-12 DashBoardMain">
      <section className="section1 col-12 d-flex flex-lg-row flex-column justify-content-around align-items-center">
        <div className="DashBoardDetailsMain col-lg-8 col-12 ">
          <div className="DashBoardFirst col-12">
            <Sample />
          </div>
        </div>
        <div className="DashBoard2 col-11 col-md-12 col-lg-3  p-3">
          <CustomerBorrow />
        </div>
      </section>

      <section className=" section2 col-12">
        <Sample2 />
        <AgentAndBranchTable />
      </section>
    </div>
  );
}
