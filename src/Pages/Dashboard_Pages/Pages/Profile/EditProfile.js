import "./Profile.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateData } from "../../../../axiosConfig/API";

export default function EditProfile() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    let adminCookies = JSON.parse(Cookies.get("admin_resta"));
    setEmployee(adminCookies);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/employees/${employee.id}`,
        formData,
        false
      );

      if (response.status === "success") {
        Cookies.set("admin_resta", JSON.stringify(employee));
        setTimeout(() => {
          Swal.fire("Updated!", response.message, "success");
        }, 250);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  if (!employee) return;

  return (
    <div className="EditProfile">
      <Breadcrumb />

      <form className="formModal bg-white" onSubmit={handleSubmit}>
        <div className="title">edit profile</div>

        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                NAME <span className="star">*</span>
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

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                EMAIL <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="email"
                id="email"
                disabled
                value={employee.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                PHONE <span className="star">*</span>
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
        </div>

        <div className="row pt-0">
          <div className="col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
