import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { getData, addData } from "../../../../axiosConfig/API";

export default function Meals({ visible, visibleToggle, updated }) {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [meal, setMeal] = useState({
    name: "",
    status: "",
    type: "",
    category_id: "",
    image: null,
    description: "",
    size: "",
    cost: "",
    number_of_pieces: "",
  });

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
    formData.append("status", meal.status);
    formData.append("type", meal.type);
    formData.append("category_id", meal.category_id);
    if (meal.image) formData.append("image", meal.image);
    formData.append("description", meal.description);
    formData.append("size", meal.size);
    formData.append("cost", meal.cost);
    formData.append("number_of_pieces", meal.number_of_pieces);

    try {
      const response = await addData("admin/meals", formData);

      if (response.status === "success") {
        updated();
        setMeal({
          name: "",
          status: 1,
          type: "vegetarian",
          category_id: "",
          image: null,
          description: "",
          size: "",
          cost: "",
          number_of_pieces: 1,
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
            <FaXmark onClick={visibleToggle} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={meal.name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    value={meal.category_id}
                    onChange={(e) => handleChange(e)}
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

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="cost" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="cost"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={meal.cost}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="number_of_pieces" className="form-label">
                    number of pieces <span className="star">*</span>
                  </label>
                  <input
                    type="number_of_pieces"
                    className="form-control"
                    name="number_of_pieces"
                    id="number_of_pieces"
                    value={meal.number_of_pieces}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    size <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="size"
                    id="size"
                    value={meal.size}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="" selected disabled>
                      --
                    </option>
                    <option value="1">small</option>
                    <option value="2">medium</option>
                    <option value="3">big</option>
                    <option value="4">family</option>
                  </select>
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

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="vegetarian" className="form-label">
                    type <span className="star">*</span>
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
                        required
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
                        required
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    status <span className="star">*</span>
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
                        onChange={(e) => handleChange(e)}
                        checked={meal.status === 0}
                        required
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
