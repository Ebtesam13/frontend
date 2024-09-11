import "../Administrators.css";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { updateData } from "../../../../../axiosConfig/API";

export default function Security() {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [new_password_confirmation, setNew_password_confirmation] =
    useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!old_password || !new_password || !new_password_confirmation) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (new_password !== new_password_confirmation) {
      setErrorMessage(
        "The new password and password confirmation do not match."
      );
      return;
    }

    try {
      const response = await updateData(
        "admin/employees/change-password",
        {
          old_password: old_password,
          new_password: new_password,
          new_password_confirmation: new_password_confirmation,
        },
        "patch"
      );

      if (response) {
        setMessage(response.message);
        setOld_password("");
        setNew_password("");
        setNew_password_confirmation("");
        setErrorMessage("");

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="Security">
      <div className="content">
        <div className="head">
          <div>security</div>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          {message && <div className="alert alert-success">{message}</div>}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="col col-12 mb-3">
            <label htmlFor="old_password">
              old password <span className="star">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="old_password"
              id="old_password"
              value={old_password}
              onChange={(e) => setOld_password(e.target.value)}
              required
            />
          </div>
          <div className="col col-12 col-md-6 mb-3">
            <label htmlFor="new_password">
              new password <span className="star">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="new_password"
              id="new_password"
              value={new_password}
              onChange={(e) => setNew_password(e.target.value)}
              required
            />
          </div>

          <div className="col col-12 col-md-6 mb-3">
            <label htmlFor="password_confirmation">
              password confirmation <span className="star">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              id="password_confirmation"
              value={new_password_confirmation}
              onChange={(e) => setNew_password_confirmation(e.target.value)}
              required
            />
          </div>

          <div className="col col-12 col-md-6">
            <button type="submit" className="btn btn-primary">
              <FaCircleCheck />
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
