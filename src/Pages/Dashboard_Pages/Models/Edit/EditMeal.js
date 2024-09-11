import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../axiosConfig/API";

export default function EditMeal({ visible, visibleToggle, item, updated }) {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [meal, setMeal] = useState({
    name: "",
    category_id: "",
    image: null,
    type: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    if (item) {
      const { image, ...rest } = item;
      setMeal({ ...rest, image: null });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;
    setMeal((prevData) => {
      if (name === "type") {
        return {
          ...prevData,
          type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
        };
      }
      if (name === "status") {
        return {
          ...prevData,
          status: id === "active" ? 1 : 0,
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
    formData.append("name", meal.name);
    formData.append("category_id", meal.category_id);
    formData.append("type", meal.type);
    formData.append("status", meal.status);
    if (meal.image) formData.append("image", meal.image);
    formData.append("description", meal.description);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/meals/${item.id}`,
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
              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={meal.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    category
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    value={meal.category_id}
                    onChange={(e) => handleChange(e)}
                  >
                    {Object(categories).length > 0 &&
                      categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
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

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="vegetarian" className="form-label">
                    type
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="vegetarian"
                        value="vegetarian"
                        onChange={(e) => handleChange(e)}
                        checked={meal.type === "vegetarian"}
                      />
                      <label htmlFor="vegetarian">vegetarian</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="non-vegetarian"
                        value="non-vegetarian"
                        onChange={(e) => handleChange(e)}
                        checked={meal.type === "non-vegetarian"}
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    status
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        value={1}
                        onChange={(e) => handleChange(e)}
                        checked={meal.status === 1}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        value={0}
                        onChange={(e) => handleChange(e)}
                        checked={meal.status === 0}
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    value={meal.description}
                    onChange={(e) => handleChange(e)}
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
