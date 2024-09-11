import "./Profile.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { updateData } from "../../../../axiosConfig/API";

export default function ChangePassword() {
  const [employee, setEmployee] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setEmployee({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.old_password ||
      !employee.new_password ||
      !employee.new_password_confirmation
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (employee.new_password !== employee.new_password_confirmation) {
      setErrorMessage(
        "The new password and password confirmation do not match."
      );
      return;
    }

    const formData = new FormData();
    formData.append("old_password", employee.old_password);
    formData.append("new_password", employee.new_password);
    formData.append(
      "new_password_confirmation",
      employee.new_password_confirmation
    );
    formData.append("_method", "patch");

    try {
      const response = await updateData(
        "admin/employees/change-password",
        formData,
        false
      );

      if (response.status === "success") {
        setEmployee({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        setMessage(response.message);
        setErrorMessage("");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="ChangePassword">
      <Breadcrumb />
      <form onSubmit={handleSubmit} className="formModal bg-white">
        {message && <div className="alert alert-success">{message}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <div className="title">change password</div>

        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="old_password" className="form-label">
                OLD PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="old_password"
                id="old_password"
                value={employee.old_password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="new_password" className="form-label">
                NEW PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="new_password"
                id="new_password"
                value={employee.new_password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div>
              <label htmlFor="new_password_confirmation" className="form-label">
                PASSWORD CONFIRMATION <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="new_password_confirmation"
                id="new_password_confirmation"
                value={employee.new_password_confirmation}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
