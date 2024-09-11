import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../../axiosConfig/API";

export default function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", customer.name);
    formData.append("email", customer.email);
    formData.append("phone", customer.phone);
    formData.append("password", customer.password);
    formData.append("password_confirmation", customer.password_confirmation);

    try {
      const response = await addData("admin/customers", formData);

      if (response.status === "success") {
        setCustomer({
          name: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
        });

        setTimeout(() => {
          Swal.fire("Saved!", response.message, "success");
        }, 250);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div
      className="modal fade"
      id="addPosCustomer"
      tabIndex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addPosCustomerLabel">
              customers
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    NAME <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={customer.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    EMAIL <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={customer.email}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    PHONE <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={customer.phone}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={customer.password}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    PASSWORD CONFIRMATION
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={customer.password_confirmation}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer btnModels">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <HiXMark />
              <span className="ps-2">close</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
