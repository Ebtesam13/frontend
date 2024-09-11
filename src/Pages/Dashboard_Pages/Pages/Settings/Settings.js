import "./Settings.css";
import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "../../../../Components/Dashboard/Header/Header";
import Sidebar from "../../../../Components/Dashboard/Sidebar/Sidebar";
import routesSetting from "../../store/routesSettings";
import SubSidebar from "./SubSidebar/SubSidebar";
import Company from "./Models/Company";
import NotFound from "../_404_page";

export default function Settings() {
  const handleClassActive = () => {
    let routes = document.querySelectorAll(".subRoutes li");
    routes.forEach((route) => route.classList.remove("active"));
    routes[0].classList.add("active");
  };

  return (
    <div className="Settings">
      <Header />
      <div className="Container" id="Container">
        <Sidebar />

        <div className="Content">
          {/* Breadcrumb */}
          <div className="Breadcrumb">
            <div className="col-12">
              <ul>
                <li key="0" onClick={() => handleClassActive()}>
                  <Link to="/settings/company" element={<Company />}>
                    settings
                  </Link>
                </li>
                <span> / </span>

                {window.location.pathname
                  .replace("/settings/", "")
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

          <div className="supContent">
            <SubSidebar />

            <Switch>
              {routesSetting.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              ))}

              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
