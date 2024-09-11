import "./Style.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export function Auth() {
  return (
    <div className="Auth">
      <Switch>
        <Route exact path="/auth/" component={Login} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/resetPassword" component={ResetPassword} />
      </Switch>
    </div>
  );
}
