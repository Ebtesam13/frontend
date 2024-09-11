import React, { useState, useEffect, useCallback } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";
import { getData } from "../../../../axiosConfig/API";

export default function Addons({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [addons, setAddons] = useState({
    name: "",
    cost: "",
    category_id: "",
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
      setAddons((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "type") {
      setAddons((prevData) => ({
        ...prevData,
        type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
      }));
    } else {
      setAddons({ ...addons, [name]: value });
    }
  };

  const handleSearch = () => {
    const { name, cost, category_id, type, status } = addons;
    const filtered = filteredData.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!cost || item.cost === parseFloat(cost)) &&
        (category_id === "" || item.category_id === parseInt(category_id)) &&
        (!type || item.type.toLowerCase().includes(type.toLowerCase())) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setAddons({
      name: "",
      cost: "",
      category_id: "",
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

      <div className="Addons FiltrationModel collapse" id="collapseTarget">
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="name" className="mb-2">
                name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={addons.name}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="cost" className="mb-2">
                price
              </label>
              <input
                type="number"
                className="form-control"
                name="cost"
                id="cost"
                value={addons.cost}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="category_id" className="mb-2">
                category
              </label>
              <select
                className="form-control"
                name="category_id"
                id="category_id"
                value={addons.category_id}
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

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">Type</label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  name="type"
                  id="vegetarian"
                  checked={addons.type === "vegetarian"}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="vegetarian">Vegetarian</label>
                <input
                  type="radio"
                  name="type"
                  id="non-vegetarian"
                  checked={addons.type === "non-vegetarian"}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="non-vegetarian">Non Vegetarian</label>
              </div>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="status" className="mb-2">
                status
              </label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  name="status"
                  id="active"
                  checked={addons.status === 1}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="active">active</label>
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  checked={addons.status === 0}
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
    </div>
  );
}
