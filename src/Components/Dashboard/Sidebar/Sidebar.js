import "./Sidebar.css";
import React, { useEffect, useState } from "react";
import { FaGear, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import publicRoutes from "../../../Pages/Dashboard_Pages/store/publicRoutes";
import { getUser } from "../../../axiosConfig/Auth";

export default function Sidebar() {
  const [adminRole, setAdminRole] = useState();

  useEffect(() => {
    const user = getUser();
    setAdminRole(user?.Role);
  }, []);

  const isActive = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path || currentPath.split("/show")[0] === path;
  };

  const injectAppTitle = () => {
    const currentPath = window.location.pathname;

    let url = currentPath.replace("/admin/dashboard/", "");
    let titleValue = "";

    if (currentPath !== "/admin/dashboard") titleValue = "Resta - " + url;
    else titleValue = "Resta";

    document.title = titleValue;
  };

  function handleClassActive(id) {
    let routes = document.querySelectorAll(".liRoute");
    routes.forEach((route) => route.classList.remove("active"));

    if (document.getElementById(id)) {
      document.getElementById(id).classList.add("active");
    }

    let container = document.getElementById("Container");
    let sidebar = document.getElementById("sidebar");

    if (window.innerWidth < 1025) {
      if (sidebar) sidebar.classList.toggle("show");
      if (sidebar) container.classList.toggle("full-width");
    }
    injectAppTitle();
  }

  return (
    <div className="Sidebar show" id="sidebar">
      <div className="closeSidebar">
        <FaXmark
          onClick={() =>
            document.getElementById("sidebar").classList.toggle("show")
          }
        />
      </div>

      {publicRoutes.map((routeGroup, index) => {
        const hasMatchingRoutes = routeGroup.items.some((route) =>
          route.role.includes(adminRole)
        );

        return (
          hasMatchingRoutes && (
            <div className="group" key={index}>
              {routeGroup.label && <label>{routeGroup.label}</label>}
              <ul>
                {routeGroup.items.map(
                  (route) =>
                    route.role.includes(adminRole) && (
                      <li
                        key={route.id}
                        id={route.id}
                        className={`liRoute ${
                          isActive(route.path) ? "active" : ""
                        }`}
                        onClick={() => handleClassActive(route.id)}
                      >
                        <Link to={route.path}>
                          {React.createElement(route.icon)}
                          <span>{route.name}</span>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          )
        );
      })}

      {adminRole === "admin" && (
        <div className="group" key="75">
          <label>set up</label>
          <ul>
            <li
              key="77"
              id="77"
              className={`liRoute ${
                isActive("/settings/company") ? "active" : ""
              }`}
              onClick={() => handleClassActive(77)}
            >
              <Link to="/settings/company">
                <FaGear />
                <span>settings</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
