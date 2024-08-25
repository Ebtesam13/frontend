import "./SubSidebar.css";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import routesSetting from "../../../store/routesSettings";
import { IoIosArrowDown } from "react-icons/io";

export default function SubSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const subRoutesRef = useRef(null);

<<<<<<< HEAD
  const handleSubRoutes = () => {
    setIsOpen(!isOpen);
    const subRoutes = subRoutesRef.current;
    if (isOpen) subRoutes.style.maxHeight = "0px";
    else subRoutes.style.maxHeight = subRoutes.scrollHeight + "px";
=======
  useEffect(() => {
    const user = getUser();
    setAdminRole(user?.Role);
  }, []);

  const isActive = (path) => window.location.pathname === path;

  const injectAppTitle = () => {
    let url = window.location.pathname.replace("/admin/dashboard/", "");
    let titleValue = "";

    if (window.location.pathname !== "/admin/dashboard")
      titleValue = "Resta - " + url;
    else titleValue = "Resta";

    document.title = titleValue;
>>>>>>> ee36647fe6a78271c5787bd49606b075183b7ddd
  };

  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    const currentRoute = window.location.pathname.replace("/settings/", "");
    setActiveRoute(currentRoute);
  }, []);

  const handleRouteClick = (route) => {
    setActiveRoute(route.replace("/settings/", ""));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="SubSidebar">
      <div className="toggleSubRoutes">
        <button className="btn btn-primary" onClick={() => handleSubRoutes()}>
          settings menu <IoIosArrowDown />
        </button>
      </div>

      <ul
        className={`subRoutes ${isOpen ? "open" : "closed"}`}
        ref={subRoutesRef}
      >
        {routesSetting.map((route, index) => (
          <li
            key={index}
            className={
              activeRoute === route.path.replace("/settings/", "")
                ? "active"
                : ""
            }
            onClick={() => handleRouteClick(route.path)}
          >
            <Link to={route.path}>
              {React.createElement(route.icon)}
              <span>{route.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
