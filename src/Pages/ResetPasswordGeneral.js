import { useState } from "react";
import reset from "../Images/reset.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function ResetPasswordGeneral(props) {
  const [changed, setChanged] = useState(false);

  const location = useLocation();
  console.log(JSON.parse(localStorage.getItem("cartItems")));
  console.log(JSON.parse(localStorage.getItem("cartTotal")));
  console.log("khgc");

  const searchParams = new URLSearchParams(location.search);
  const allParams = Object.fromEntries(searchParams);

  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    new_passwordError: "",
    new_password_confirmationError: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "new_password") {
      setFormData({
        ...formData,
        new_password: event.target.value,
      });
      setErrors({
        ...errors,
        new_passwordError:
          event.target.value.length === 0
            ? "This Field Is Required"
            : !event.target.validity.valid && "Please enter a vaild password",
      });
    } else if (event.target.name === "new_password_confirmation") {
      setFormData({
        ...formData,
        new_password_confirmation: event.target.value,
      });
      setErrors({
        ...errors,
        new_password_confirmationError:
          event.target.value.length === 0
            ? "This Field is required"
            : event.target.value !== formData.new_password &&
              "Password and re-type should match",
      });
    }
  };
  var resetPasswordData = { ...allParams, ...formData };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // var url = `http://27.0.0.1:8000/api/auth/reset-password-form?token=${allParams.token}&email=${allParams.email}`

    try {
      // "http://127.0.0.1:8000/api/auth/reset-password"
      const response = await axios.post(props.endpoint, resetPasswordData);
      console.log(response.data);
      setChanged(true);
    } catch (error) {}
  };

  return (
    <>
      <div className=" container w-75 m-auto text-center pt-5">
        <img src={reset} height={75} width={75} alt="reset"></img>
        <h3>Password Reset</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new_password">New Password:</label>
            <br></br>
            <input
              className="form-control m-auto w-50"
              type="password"
              id="new_password"
              name="new_password"
              //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              value={formData.new_password}
              onBlur={handleInputChange}
              onChange={handleInputChange}
            />
            <br></br>
            <span className="text-danger">{errors.new_passwordError}</span>
          </div>
          <div>
            <label htmlFor="new_password_confirmation">
              Re-type your new password:
            </label>
            <br></br>
            <input
              className="form-control m-auto w-50"
              type="password"
              id="new_password_confirmation"
              name="new_password_confirmation"
              value={formData.new_password_confirmation}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            <br></br>
            <span className="text-danger">
              {errors.new_password_confirmationError}
            </span>
          </div>
          <button
            className="btn primary my-3 mx-auto"
            type="button"
            onClick={(e) => handleSubmit(e)}
            disabled={
              errors.new_passwordError ||
              errors.new_password_confirmationError ||
              formData.new_password === "" ||
              formData.new_password_confirmation === ""
            }
          >
            Change Password
          </button>{" "}
        </form>
        <div className={changed ? "visible" : "invisible"}>
          <br></br>
          You Reseted your password successfully, now you can continue to{" "}
          <Link to="/customer/checkout">
            <strong className="text-success">Checkout</strong>
          </Link>{" "}
          page and log in.
        </div>
      </div>
    </>
  );
}
