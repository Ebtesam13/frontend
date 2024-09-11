import React from "react";
import routes from "../Dashboard_Pages/store/publicRoutes";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../Components/Dashboard/Header/Header";
import Sidebar from "../../Components/Dashboard/Sidebar/Sidebar";
import privateRoutes from "../Dashboard_Pages/store/privateRoutes";
import NotFound from "./Pages/_404_page";
import ProtectedRoute from "./ProtectedRoute";

export function Dashboard() {
  return (
    <div className="Dashboard">
      <Header />
      <div className="Container" id="Container">
        <Sidebar />

        <div className="Content">
          <Switch>
            {privateRoutes.map((route) => (
              <ProtectedRoute
                key={route.path}
                path={route.path}
                role={route.role}
                component={route.component}
              />
            ))}

            {routes.flatMap((routeGroup) =>
              routeGroup.items.map((route) => (
                <ProtectedRoute
                  key={route.path}
                  path={route.path}
                  role={route.role}
                  component={route.component}
                  exact={route.name === "Dashboard"}
                />
              ))
            )}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
