import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Email(props) {
  const [requestedToReset, setRequestedToReset] = useState(false);
  let history = useHistory();
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
      setEmailError(
        event.target.value.length === 0
          ? "This Field is required"
          : !event.target.validity.valid && "Please enter a vaild email"
      );
    }
  };

  //     const handleSubmit = async (e) => {
  //         e.preventDefault();

  //         setSigned(0)

  //         console.log(adminToken);

  //         try {
  //             //'http://127.0.0.1:8000/api/admin/login'
  //             const response = await axios.post(props.loginEP, formData);
  //             setIsLoggedIn(true)
  //             setAdminToken(response.access_token)
  //             //'AdminToken'
  //             localStorage.setItem(props.tokenName, JSON.stringify(adminToken));
  // //"/admin/dashboard/add-ons"
  //             history.push(props.redirect);
  //             console.log(response);

  //             setErrors({
  //                 ...errors,
  //                 loginError: ""
  //             })

  //             localStorage.setItem(props.tokenName, JSON.stringify(response.data.access_token));
  //             setAdminToken(JSON.parse(localStorage.getItem(props.tokenName)));

  //             console.log('Form submitted successfully:', response.data);
  //         } catch (error) {
  //             console.error('Error submitting form:', error);

  //             setErrors({
  //                 ...errors,
  //                 loginError: "invalid email or password"
  //             })
  //         }

  //     };

  const resetPassword = async (e) => {
    if (email === "") {
      setEmailError("please enter your email to reset your password");
    }

    e.preventDefault();
    var emailToSend = { email: email };
    try {
      //"http://127.0.0.1:8000/api/admin/employees/forgot-password"
      const response = await axios.post(data, emailToSend);
      setRequestedToReset(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-50 color-dark admin-login mx-auto my-5  text-center">
        <form className="mx-auto w-75 pb-5">
          <div>
            {/* <span className="text-danger">{errors.loginError}</span> */}
            <br></br>

            <label htmlFor="email" className="form-label ">
              Email:
            </label>
            <br></br>
            <span className="text-danger">{emailError}</span>
            <input
              type="email"
              className="form-control email"
              id="email"
              name="email"
              required
              value={email}
              onBlur={handleInputChange}
              onChange={handleInputChange}
            />
          </div>
          <br></br>
          <span
            className={
              "text-danger mb-5 " + (requestedToReset ? "visible" : "invisible")
            }
          >
            Check your email
          </span>
          <br></br>

          <button
            className="btn btn-dark rounded-pill"
            onClick={resetPassword}
            type="button"
            disabled={emailError || email === ""}
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
