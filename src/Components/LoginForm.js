import { useState } from "react";

export function LoginForm(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
    loginError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSigned(0);

    console.log(accessToken);
    // 'http://127.0.0.1:8000/api/admin/login'

    try {
      const response = await axios.post(props.endpoint, formData);
      setIsLoggedIn(true);

      setErrors({
        ...errors,
        loginError: "",
      });

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.access_token)
      );
      setAccessToken(JSON.parse(localStorage.getItem("accessToken")));

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrors({
        ...errors,
        loginError: "invalid email or password",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-danger">{errors.loginError}</span>
          <br></br>

          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <br></br>
          <span className="text-danger">{errors.emailError}</span>
          <input
            type="email"
            className="form-control email"
            id="email"
            name="email"
            required
            value={formData.email}
            onBlur={handleInputChange}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <br></br>
          <span className="text-danger">{errors.passError}</span>

          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={formData.password}
            onBlur={handleInputChange}
            onChange={handleInputChange}
            required
          />
        </div>
        <Link to="/customer/register">
          {" "}
          <p data-bs-dismiss="modal">Register</p>{" "}
        </Link>
        <div className="d-flex ">
          <a href="" className="pr-5" onClick={resetPassword}>
            <p>Forgot password</p>
          </a>
          <span
            className={
              "text-danger " + (requestedToReset ? "visible" : "invisible")
            }
          >
            Check your email
          </span>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        {/* ||  errors.passError */}
        <button
          className="btn primary"
          onClick={handleSubmit}
          type="button"
          disabled={
            errors.emailError ||
            formData.password === "" ||
            formData.email === ""
          }
        >
          Log in
        </button>
      </form>
    </>
  );
}
