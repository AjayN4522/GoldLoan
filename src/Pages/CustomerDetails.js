import React, { useState, useEffect } from "react";
import moment from "moment";
import MenuBar from "../Components/MenuBar";
import "../Styles/CustomerDetails.css";
import Header from "../Components/Header";
import Customers from "../json/CustomerDetails.json";
import User from "../svg/user-circle.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerDetails() {
  const [menuVisible, setMenuVisible] = useState(true);

  const [customerData, setCustomerData] = useState([]);

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
  }, [1]);

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/customer/getAllCustomer"
      );
      setCustomerData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => getAllCustomers();
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
      className="CustomerDetailsPage"
    >
      <MenuBar isVisible={menuVisible} username="John" />
      <div className="Customer-Content">
        <Header onMenuToggle={toggleMenu} pageName="Customer Details" />
        <hr className="divider" />
        <Customer
          customerData={customerData}
          getAllCustomers={getAllCustomers}
        />
      </div>
    </div>
  );
}

export default CustomerDetails;

function Customer({ customerData, getAllCustomers }) {
  console.log(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState(1);
  const [searchQuery, setSearchQuery] = useState();

  const filteredCustomerList = searchQuery
    ? customerData.length > 0 &&
      customerData.filter((item) =>
        item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customerData;

  const changeCustomer = (i) => {
    setSelectedCustomer(i);
  };

  const formatDate = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date)) throw new Error("Invalid Date");

      const options = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        date
      );

      // Replace the default space separator with hyphens
      return formattedDate.replace(/ /g, "-");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const handleUpdate = (id) => {
    sessionStorage.setItem("customer_id", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/customer/deleteCustomer/${sessionStorage.getItem(
          "tenant_id"
        )}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
      getAllCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="CustomerDetailsMain">
        <div className="CustomerDetails-Left">
          <div className="CustomerDetails-Left-Header">
            <div className="Customer-SearchMain">
              <input
                className="Customer-SearchBox"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                type="text"
              ></input>
              <button className="Customer-SearchIcon">
                <i class="bi bi-search"></i>
              </button>
            </div>
            <Link style={{ textDecoration: "none" }} to={"/CustomerForm"}>
              <button className="Add-Customer-Btn">
                Add Customer<i class="bi bi-plus"></i>
              </button>
            </Link>
          </div>
          <div className="CustomerDetails-Group">
            {filteredCustomerList.length <= 0 ? (
              <p className="NullCustomers">No Customers Exists</p>
            ) : (
              filteredCustomerList.map((items, i) => {
                return (
                  <div
                    className="Customer-List"
                    onClick={() => changeCustomer(i)}
                  >
                    <p className="List-cname">
                      {items.first_name + " " + items.last_name}
                    </p>
                    <p className="List-phone">{items.phone_number}</p>
                    <p className="List-email">{items.email}</p>
                    <div className="List-Buttons">
                      <Link
                        style={{ textDecoration: "none" }}
                        state={{ customer: items }}
                        to={"/CustomerForm"}
                      >
                        <button className="Customer-List-EditIcon">
                        onClick={() => {
                            handleUpdate(items.customer_id);
                          }}
                          <i class="bi bi-pencil"></i>
                        </button>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/CustomerDetails"}
                      >
                        <button
                          onClick={() => {
                            handleDelete(items.customer_id);
                          }}
                          className="Customer-List-DeleteIcon"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="CustomerDetailsRight">
          <div className="CustomerDetailsRight-Group">
            <div className="CustomerDetailsRight-Header">
              <img className="Customer-Photo" src={User} alt=""></img>
              <p className="Customer-Name-Label">
                {Customers[selectedCustomer]
                  ? Customers[selectedCustomer].first_name +
                    " " +
                    Customers[selectedCustomer].last_name
                  : ""}
              </p>
            </div>
            <div className="CustomerDetailsRight-Info">
              <p className="Customer-Info-Label">Customer Information</p>
              <div className="Details-Group">
                <p className="Details-Label">Phone</p>
                <p className="Details-Info">
                  {Customers[selectedCustomer]
                    ? Customers[selectedCustomer].phone_number
                    : ""}
                </p>
              </div>
              <div className="Details-Group">
                <p className="Details-Label">Date of Birth</p>
                <p className="Details-Info">
                  {Customers[selectedCustomer]
                    ? formatDate(Customers[selectedCustomer].date_of_birth)
                    : ""}
                </p>
              </div>
              <div className="Details-Group">
                <p className="Details-Label">Verified Card</p>
                <p className="Details-Info">
                  {Customers[selectedCustomer]
                    ? Customers[selectedCustomer].id_card_number
                    : ""}
                </p>
              </div>
              <div className="Details-Group">
                <p className="Details-Label">Comments</p>
                <p className="Details-Info">Good</p>
              </div>
            </div>
          </div>
          <div className="CustomerDetailsRight-Footer">
            <button className="Customer-Edit">
              <Link
                className="ELink"
                style={{ textDecoration: "none" }}
                state={{ customer: Customers[selectedCustomer] }}
                to={"/CustomerForm"}
              >
                Edit
              </Link>
            </button>
            <button className="Customer-Delete">
              <Link
                style={{ textDecoration: "none" }}
                className="DLink"
                to={"/CustomerDetails"}
              >
                Delete
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
