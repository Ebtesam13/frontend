import axios from "axios";
import Cookies from "js-cookie";
import { basicURL } from "./API";

export const login = async (email, password) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.post(basicURL + "admin/login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("token_resta", response.data.access_token);
    Cookies.set("admin_resta", JSON.stringify(response.data.customer));
    setTimeout(() => {
      if (Cookies.get("token_resta")) Cookies.remove("token_resta");
    }, 86400000);

    // illogical
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }

    if (!localStorage.getItem("cartTotal")) {
      localStorage.setItem("cartTotal", 0);
    }

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const logout = () => {
  return new Promise((resolve) => {
    if (Cookies.get("token_resta")) Cookies.remove("token_resta");
    if (Cookies.get("admin_resta")) Cookies.remove("admin_resta");
    resolve({ message: "Logged out successfully" });
  });
};

export const getUser = () => {
  const user = Cookies.get("admin_resta");
  return user ? JSON.parse(user) : null;
};

export const isAuth = () => {
  return !!Cookies.get("token_resta");
};
