import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import profile from "../../../assets/global/profile.png";
import { logout, getUser } from "../../../axiosConfig/Auth";
import Cookies from "js-cookie";

export default function Profile() {
  const history = useHistory();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const profileMenuRef = useRef(null);
  const [admin, setAdmin] = useState("");

  const mockAdmin = {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    phone: "+000000000",
  };

  useEffect(() => {
    try {
      const _admin = getUser();
      if (_admin) {
        setAdmin(_admin);
      } else {
        setAdmin(mockAdmin);
      }
    } catch (error) {
      console.error("Failed to get user data", error);
      setAdmin(mockAdmin);
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.replace("/admin/dashboard/", "");
    setActiveItem(path);
  }, [location]);

  const classActive = (part) => {
    return activeItem === part ? "active" : "";
  };

  const authLogout = () => {
    let loader = document.getElementById("Loader");
    if (loader) loader.classList.add("show");

    setTimeout(() => {
      logout().then((response) => {
        Cookies.set("logoutMessage", response.message);

        document.body.style.overflow = "visible";
        if (loader) loader.classList.remove("show");

        history.push("/auth/login");
      });
    }, 1000);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target) &&
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className="dropdown profile">
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img loading="lazy" src={profile} alt="avatar" />
        <div className="details">
          <span>Hello</span>
          <b>{admin.name}</b>
        </div>
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        id="profile"
        ref={profileMenuRef}
      >
        <div className="user">
          <div className="image">
            <img loading="lazy" src={profile} alt="user" />

            <form className="input-file">
              <input
                type="file"
                name="image"
                id="file-input"
                className="file-input"
                value=""
                onChange={(e) => handleFileChange(e)}
              />
              <label htmlFor="file-input">
                <AiFillEdit />
              </label>
            </form>
          </div>

          <ul>
            <li key="0">{admin.name}</li>
            <li key="1" className="email">
              {admin.email}
            </li>
            <li key="2">{admin.phone}</li>
          </ul>
        </div>

        <ul className="group">
          <li
            className={`item ${classActive("edit/profile")}`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Link to="/admin/dashboard/edit/profile">
              <FiEdit />
              <span>edit profile</span>
            </Link>
          </li>
          <li
            className={`item ${classActive("change/password")}`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Link to="/admin/dashboard/change/password">
              <IoKeyOutline />
              <span>change password</span>
            </Link>
          </li>
          <li className="item" onClick={authLogout}>
            <Link to="#">
              <CiLogout />
              <span>logout</span>
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}
