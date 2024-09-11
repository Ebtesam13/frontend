import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function DiningTables({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [diningTables, setDiningTables] = useState({
    number: "",
    size: "",
    floor: "",
    status: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));

    const { name, value, id } = e.target;
    if (name === "status") {
      setDiningTables((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setDiningTables({ ...diningTables, [name]: value });
    }
  };

  const handleSearch = () => {
    const { number, size, floor, status } = diningTables;
    const filtered = filteredData.filter((item) => {
      return (
        (number === "" || item.number === parseInt(number)) &&
        (size === "" || item.size === parseInt(size)) &&
        (floor === "" || item.floor === parseInt(floor)) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setDiningTables({
      number: "",
      size: "",
      floor: "",
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

      <div
        className="DiningTables FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="number" className="mb-2">
                number
              </label>
              <input
                type="text"
                className="form-control"
                name="num"
                id="num"
                value={diningTables.num}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="size" className="mb-2">
                size
              </label>
              <input
                type="text"
                className="form-control"
                name="size"
                id="size"
                value={diningTables.size}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="floor" className="mb-2">
                floor
              </label>
              <input
                type="text"
                className="form-control"
                name="floor"
                id="floor"
                value={diningTables.floor}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">status</label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  name="status"
                  id="active"
                  checked={diningTables.status === 1}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="active">active</label>
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  checked={diningTables.status === 0}
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
