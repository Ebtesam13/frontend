import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
import { Branch_2 } from "./Pages/Dashboard_Pages/Branch_2.js";
import { Customer } from "./Pages/Customer_Pages/Customer";
import Settings from "./Pages/Dashboard_Pages/Pages/Settings/Settings";
import Loader from "./Components/Dashboard/Loader/Loader.js";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Loader />

          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/auth" component={Auth} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/branch_2" component={Branch_2} />
            <Route path="/settings" component={Settings} />
            <Route path="/customer" component={Customer} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
