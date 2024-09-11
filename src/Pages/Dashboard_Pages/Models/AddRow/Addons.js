import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, addData } from "../../../../axiosConfig/API";

export default function Addons({ visible, visibleToggle, updated }) {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [addon, setAddon] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: null,
    status: "",
    cost: "",
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "type") {
      setAddon((prevData) => ({
        ...prevData,
        type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setAddon((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setAddon({ ...addon, image: e.target.files[0] });
    } else {
      setAddon({ ...addon, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addon.name);
    formData.append("description", addon.description);
    formData.append("type", addon.type);
    formData.append("category_id", addon.category_id);
    formData.append("image", addon.image);
    formData.append("status", addon.status);
    formData.append("cost", addon.cost);

    try {
      const response = await addData("admin/addons", formData);

      if (response.status === "success") {
        updated();
        setAddon({
          name: "",
          description: "",
          type: "vegetarian",
          category_id: "",
          image: null,
          status: 1,
          cost: "",
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

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      setCategories(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div id="AddTable" className={`${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            add {window.location.pathname.replace("/admin/dashboard/", "")}
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
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={addon.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    onChange={(e) => handleChange(e)}
                    value={addon.category_id}
                    required
                  >
                    <option value="" selected disabled>
                      --
                    </option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={addon.cost}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="vegetarian" className="form-label">
                    type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="vegetarian"
                        value="vegetarian"
                        checked={addon.type === "vegetarian"}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="vegetarian">vegetarian</label>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="non-vegetarian"
                        value="non-vegetarian"
                        checked={addon.type === "non-vegetarian"}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
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
                        checked={addon.status === 1}
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
                        checked={addon.status === 0}
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
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description <span className="star">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    value={addon.description}
                    required
                  ></textarea>
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
