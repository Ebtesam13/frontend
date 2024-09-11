import "../Models.css";
import React, { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

export default function Offers({ visible, visibleToggle, updated }) {
  const imageRef = useRef(null);
  const [offer, setOffer] = useState({
    name: "",
    discount: "",
    startDate: "",
    endDate: "",
    status: "active",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setOffer((prevData) => {
      if (name === "image" && type === "file") {
        return {
          ...prevData,
          image: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", offer.name);
    formData.append("discount", offer.discount);
    formData.append("startDate", offer.startDate);
    formData.append("endDate", offer.endDate);
    formData.append("status", offer.status);
    if (offer.image) formData.append("image", offer.image);

    try {
      const response = await addData("admin/offers", formData);

      if (response.status === "success") {
        updated();
        setOffer({
          name: "",
          discount: "",
          startDate: "",
          endDate: "",
          status: "active",
          image: null,
        });
        if (imageRef.current) imageRef.current.value = null;
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
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="discount" className="form-label">
                    discount <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount"
                    id="discount"
                    onChange={(e) => handleChange(e)}
                    value={offer.discount}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    start date <span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    onChange={(e) => handleChange(e)}
                    value={offer.startDate}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    end date <span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    onChange={(e) => handleChange(e)}
                    value={offer.endDate}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        value="active"
                        checked={offer.status === "active"}
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
                        value="inactive"
                        checked={offer.status === "inactive"}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    ref={imageRef}
                    onChange={(e) => handleChange(e)}
                    required
                  />
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
