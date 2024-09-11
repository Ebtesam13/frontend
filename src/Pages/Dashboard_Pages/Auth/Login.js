import React, { useState, useEffect } from "react";
import {Link, useHistory } from "react-router-dom";
import { login } from "../../../axiosConfig/Auth";
import CustomAlert from "../../../Components/Dashboard/CustomAlert/CustomAlert";
import Cookies from "js-cookie";

export default function Login() {
  const history = useHistory();
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (Cookies.get("token_resta")) history.push("/admin/dashboard");
  }, [history]);

  useEffect(() => {
    if (Cookies.get("logoutMessage")) {
      setAlert({ message: Cookies.get("logoutMessage"), type: "success" });
      Cookies.remove("logoutMessage");
    }
  }, []);

  const [email, setEmail] = useState("ebtesam132015@gmail.com");
  const [password, setPassword] = useState("12345678");

  const injectData = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert({
        message: "Both email and password are required",
        type: "error",
      });
      return;
    }

    try {
      const data = await login(email, password);

      if (data.status === "success") {
        setEmail("");
        setPassword("");
        Cookies.set("loginMessage", "Login successfully");

        if (document.getElementById("Loader")) {
          document.getElementById("Loader").classList.remove("show");
        }

        history.push("/admin/dashboard");
      } else {
        setAlert({ message: data?.message, type: "error" });
      }
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="formUser">
      <div className="content">
        <form className="mb-3" onSubmit={handleSubmit}>
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ message: "", type: "" })}
          />
          <div className="mb-3">
            <label htmlFor="email pb-2">email</label>
            <input
              type="email"
              className="form-control email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password pb-2">password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-color px-5 mb-2 w-100">
              Login
            </button>
          </div>
          <div className="changeRoute form-class-ext-center text-dark">
            <Link to="/auth/resetPassword" className="text-dark fw-bold">
              forget password?
            </Link>
          </div>
        </form>

        <div className="roles">
          <button onClick={() => injectData("ebtesam132015@gmail.com", "12345678")}>
            admin
          </button>
          <button onClick={() => injectData("chef@gmail.com", "12345678")}>
            chef
          </button>
          <button onClick={() => injectData("casher@gmail.com", "12345678")}>
            casher
          </button>
        </div>
      </div>
    </div>
  );
}
