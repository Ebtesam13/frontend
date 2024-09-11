import "./Header.css";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { IoBookmarks } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import Logo from "../../../assets/global/logo.png";
import Profile from "./Profile";
import Cookies from "js-cookie";
import CustomAlert from "../CustomAlert/CustomAlert";

export default function Header() {
  const history = useHistory();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isOpen, setIsOpen] = useState(false);
  const branchRef = useRef(null);
  const [selectedBranch, setSelectedBranch] = useState(() =>
    window.location.pathname === "/branch_2" ? "2" : "1"
  );

  useEffect(() => {
    if (Cookies.get("loginMessage")) {
      setAlert({ message: Cookies.get("loginMessage"), type: "success" });
      Cookies.remove("loginMessage");
    }
  }, []);

  const handleClickOutside = (event) => {
    if (
      branchRef.current &&
      !branchRef.current.contains(event.target) &&
      !event.target.closest(".dropdown-toggle")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleClass = () => {
    var parent = document.getElementById("sidebar");
    if (parent) parent.classList.toggle("show");

    let container = document.getElementById("Container");
    if (container) container.classList.toggle("full-width");
  };

  const injectAppTitle = () => {
    document.title = "Resta";
    history.push("/admin/dashboard");
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div className="Header">
      <Link to="#" onClick={injectAppTitle}>
        <img loading="lazy" src={Logo} className="logo" alt="logo" />
      </Link>

      <div className="navbar">
        <div className="customRow">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <AiFillShop className="icon-shop" />
              <div className="details">
                <span>Branch</span>
                <b>{"Mirpur-1 (main)"}</b>
              </div>
            </button>
            <ul
              className={`dropdown-menu ${isOpen ? "show" : ""}`}
              id="branch"
              ref={branchRef}
            >
              <li>
                <Link to="admin/dashboard">
                  <input
                    type="radio"
                    name="branch"
                    id="branch_id_1"
                    value="1"
                    checked={selectedBranch === "1"}
                    onChange={handleBranchChange}
                  />
                  <label htmlFor="branch_id_1">{"Mirpur-1 (main)"}</label>
                </Link>
              </li>
              <li>
                <Link to="/branch_2">
                  <input
                    type="radio"
                    name="branch"
                    id="branch_id_2"
                    value="2"
                    checked={selectedBranch === "2"}
                    onChange={handleBranchChange}
                  />
                  <label htmlFor="branch_id_2">{"Gulshan-1"}</label>
                </Link>
              </li>
            </ul>
          </div>

          <div className="customBtn">
            <Link to="/admin/dashboard/pos" className="pos">
              <IoBookmarks />
            </Link>

            <button className="menu" onClick={() => handleToggleClass()}>
              <RiMenu2Line />
            </button>
          </div>
        </div>

        <Profile />
      </div>

      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
    </div>
  );
}
