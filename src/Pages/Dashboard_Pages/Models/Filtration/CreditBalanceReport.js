import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function CreditBalanceReport({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [credit, setCredit] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));

    const { name, value } = e.target;
    setCredit({ ...credit, [name]: value });
  };

  const handleSearch = () => {
    const { name, cost, type, status } = credit;
    const filtered = filteredData.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!cost || item.cost === parseFloat(cost)) &&
        (!type || item.type.toLowerCase().includes(type.toLowerCase())) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setCredit({
      name: "",
      email: "",
      phone: "",
      role: "",
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
        className="CreditBalanceReport FiltrationModel collapse"
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
                value={credit.cost}
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
                value={credit.cost}
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
                value={credit.cost}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="role" className="mb-2">
                role
              </label>
              <input
                type="text"
                className="form-control"
                name="role"
                id="role"
                value={credit.cost}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col col-3 d-flex gap-3">
              <button
                type="search"
                className="btn btn-primary"
                onClick={handleSearch}
                disabled
              >
                <FaSearch />
                <span className="ps-2">search</span>
              </button>
              <button
                type="clear"
                className="btn btn-secondary"
                onClick={handleClear}
                disabled
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
