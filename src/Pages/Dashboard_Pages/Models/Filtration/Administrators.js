import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function Administrators({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [administrators, setAdministrators] = useState({
    name: "",
    email: "",
    phone: "",
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
      setAdministrators((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setAdministrators({ ...administrators, [name]: value });
    }
  };

  const handleSearch = () => {
    const { name, email, phone, status } = administrators;
    const filtered = filteredData.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!email || item.email.toLowerCase().includes(email.toLowerCase())) &&
        (!phone || item.phone.toLowerCase().includes(phone.toLowerCase())) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setAdministrators({
      name: "",
      email: "",
      phone: "",
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
        className="Administrators FiltrationModel collapse"
        id="collapseTarget"
      >
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
                value={administrators.name}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="email" className="mb-2">
                email
              </label>
              <input
                type="email"
                className="form-control email"
                name="email"
                id="email"
                value={administrators.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="phone" className="mb-2">
                phone
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                value={administrators.phone}
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
                  checked={administrators.status === 1}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="active">active</label>
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  checked={administrators.status === 0}
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
