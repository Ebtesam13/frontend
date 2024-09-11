import "./Breadcrumb.css";
import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../../../Pages/Dashboard_Pages/Pages/Dashboard";

export default function Breadcrumb() {
  const handleClassActive = () => {
    let routes = document.querySelectorAll(".Sidebar .group ul>li");
    routes.forEach((route) => route.classList.remove("active"));
    routes[0].classList.add("active");
  };

  return (
    <div className="Breadcrumb">
      <div className="col-12 pb-3">
        <ul>
          <li key={0} onClick={() => handleClassActive()}>
            <Link to="/admin/dashboard" element={<Dashboard />}>
              dashboard
            </Link>
          </li>
          <span> / </span>
          {window.location.pathname
            .replace("/admin/dashboard/", "")
            .split("/")
            .map((part, index, array) => (
              <React.Fragment key={index}>
                <li key={index + 1}>{part}</li>
                {index !== array.length - 1 && <span> / </span>}
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
}
