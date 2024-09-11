import "../Models.css";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditOffer({ visible, visibleToggle, item, updated }) {
  const imageRef = useRef(null);
  const [offer, setOffer] = useState({
    name: "",
    discount: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  useEffect(() => {
    if (item) {
      const { image, ...rest } = item;
      setOffer({ ...rest, image: null });
    }
  }, [item]);

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
    if (offer.image) formData.append("image", offer.image);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/offers/${item.id}`,
        formData,
        true
      );

      if (response.status === "success") {
        updated();
        setTimeout(() => {
          Swal.fire("Updated!", response.message, "success");
        }, 250);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div id="AddTable" className={visible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            edit {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>
          <div className="closeSidebar">
            <HiXMark onClick={visibleToggle} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="discount" className="form-label">
                    discount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount"
                    id="discount"
                    onChange={(e) => handleChange(e)}
                    value={offer.discount}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    start date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    onChange={(e) => handleChange(e)}
                    value={offer.startDate}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    end date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    onChange={(e) => handleChange(e)}
                    value={offer.endDate}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    ref={imageRef}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">update</span>
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
