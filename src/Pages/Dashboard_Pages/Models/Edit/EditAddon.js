import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../axiosConfig/API";

export default function EditAddon({ visible, visibleToggle, item, updated }) {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [addon, setAddon] = useState({
    name: "",
    description: "",
    type: "vegetarian",
    category_id: -1,
    image: null,
    cost: "",
  });

  useEffect(() => {
    if (item) {
      const { image, ...rest } = item;
      setAddon({ ...rest, image: null });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;

    setAddon((prevData) => {
      if (name === "type") {
        return {
          ...prevData,
          type: id === "veg" ? "vegetarian" : "non-vegetarian",
        };
      }

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
    formData.append("name", addon.name);
    formData.append("description", addon.description);
    formData.append("type", addon.type);
    formData.append("category_id", addon.category_id);
    if (addon.image) formData.append("image", addon.image);
    formData.append("cost", addon.cost);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/addons/${item.id}`,
        formData,
        true
      );

      if (response.status === "success") {
        updated();
        if (imageRef.current) imageRef.current.value = null;
        setTimeout(() => {
          Swal.fire("Updated!", response.message, "success");
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={addon.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category_id" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    value={addon.category_id}
                    onChange={(e) => handleChange(e)}
                  >
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
                  <label htmlFor="cost" className="form-label">
                    price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={addon.cost}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="vegetarian"
                        value="vegetarian"
                        checked={addon.type === "vegetarian"}
                        onChange={(e) => handleChange(e)}
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
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
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

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    value={addon.description}
                  ></textarea>
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
