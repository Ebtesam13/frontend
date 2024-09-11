import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function Employees({ visible, visibleToggle, updated }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: 1,
    role: "",
    identity_card: "",
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "status") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("password", employee.password);
    formData.append("password_confirmation", employee.password_confirmation);
    formData.append("Role", employee.role);
    formData.append("status", employee.status);
    formData.append("identity_card", employee.identity_card);

    try {
      const response = await addData("admin/employees", formData);
      if (response.status === "success") {
        updated();
        setEmployee({
          name: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
          status: 1,
          role: "",
          identity_card: "",
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
    <div id="AddTable" className={`${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            add {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>

          <div className="closeSidebar">
            <FaXmark onClick={visibleToggle} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={employee.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={employee.email}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={employee.phone}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="Identity_card" className="form-label">
                    Identity card <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="identity_card"
                    id="Identity_card"
                    value={employee.identity_card}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    password <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={employee.password}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    password confirmation <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirm"
                    value={employee.password_confirmation}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="role">Role</label>
                  <select
                    className="form-control"
                    name="role"
                    id="role"
                    value={employee.role}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="" selected disabled>
                      --
                    </option>
                    <option value="admin">admin</option>
                    <option value="casher">casher</option>
                    <option value="chef">chef</option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        value={1}
                        checked={employee.status === 1}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        value={0}
                        checked={employee.status === 0}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={visibleToggle}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Employees;
