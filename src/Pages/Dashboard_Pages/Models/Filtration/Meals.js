import React, { useState, useEffect, useCallback } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";
import { getData } from "../../../../axiosConfig/API";

export default function Meals({ handleModalToggle, data, headers, filtrated }) {
  const [meals, setMeals] = useState({
    name: "",
    cost: "",
    category_id: "",
    size: "",
    type: "",
    status: "",
  });
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));

    const { name, value, id } = e.target;

    if (name === "status") {
      setMeals((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "type") {
      setMeals((prevData) => ({
        ...prevData,
        type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
      }));
    } else {
      setMeals({ ...meals, [name]: value });
    }
  };

  const handleSearch = () => {
    const { name, cost, category_id, size, type, status } = meals;
    const filtered = filteredData.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!cost || item.cost === parseFloat(cost)) &&
        (category_id === "" || item.category_id === parseInt(category_id)) &&
        (!size || item.size === parseFloat(size)) &&
        (!type || item.type.toLowerCase().includes(type.toLowerCase())) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setMeals({
      name: "",
      cost: "",
      category_id: "",
      size: "",
      type: "",
      status: "",
    });
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    filtrated(JSON.parse(sessionStorage.getItem("origin_data")));
  };

  return (
    <div className="headerTable">
      <ActionsFilter
        handleModalToggle={handleModalToggle}
        data={data}
        headers={headers}
      />

      <div className="Meals FiltrationModel collapse" id="collapseTarget">
        <div className="row mt-3">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="name" className="mb-2">
              name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={meals.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="price" className="mb-2">
              price
            </label>
            <input
              type="number"
              className="form-control"
              name="cost"
              id="cost"
              value={meals.cost}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="category_id" className="mb-2">
              category
            </label>
            <select
              className="form-control"
              name="category_id"
              id="category_id"
              value={meals.category_id}
              onChange={(e) => handleChange(e)}
            >
              <option value="" selected disabled>
                --
              </option>
              {Object(categories).length &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="size" className="mb-2">
              size
            </label>

            <select
              className="form-control"
              name="size"
              id="size"
              value={meals.size}
              onChange={(e) => handleChange(e)}
            >
              <option value="" selected disabled>
                --
              </option>
              <option value="1">small</option>
              <option value="2">medium</option>
              <option value="3">large</option>
              <option value="4">family</option>
            </select>
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label className="mb-2">Type</label>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="radio"
                name="type"
                id="vegetarian"
                checked={meals.type === "vegetarian"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="vegetarian">Veg</label>
              <input
                type="radio"
                name="type"
                id="non-vegetarian"
                checked={meals.type === "non-vegetarian"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="non-vegetarian">Non Veg</label>
            </div>
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label className="mb-2">status</label>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="radio"
                name="status"
                id="active"
                checked={meals.status === 1}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="active">active</label>
              <input
                type="radio"
                name="status"
                id="inactive"
                checked={meals.status === 0}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="inactive">inactive</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col col-3 d-flex gap-3">
            <button
              type="search"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              <FaSearch />
              <span className="ps-2">search</span>
            </button>
            <button
              type="clear"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              <HiXMark />
              <span className="ps-2">clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
