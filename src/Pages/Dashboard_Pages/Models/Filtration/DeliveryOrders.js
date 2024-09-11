import React, { useState, useEffect, useCallback } from "react";
import { HiXMark } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import ActionsFilter from "./ActionsFilter";
import { getData } from "../../../../axiosConfig/API";

export default function DeliveryOrders({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [deliveryOrders, setDeliveryOrders] = useState({
    id: "",
    customer_id: "",
    created_at: "",
    total_cost: "",
    status: "",
  });
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchCustomers = useCallback(async () => {
    try {
      const result = await getData("admin/customers");
      setCustomers(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    const { name, value } = e.target;
    if (name === "created_at") {
      setDeliveryOrders((prevData) => ({
        ...prevData,
        created_at: formatDate(value),
      }));
    } else {
      setDeliveryOrders({ ...deliveryOrders, [name]: value });
    }
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      timeZone: "UTC",
    });
  }

  const handleSearch = () => {
    const { id, customer_id, created_at, total_cost, status } = deliveryOrders;
    const filtered = filteredData.filter((item) => {
      return (
        (id === "" || item.id === parseInt(id)) &&
        (customer_id === "" || item.customer_id === parseInt(customer_id)) &&
        (!created_at || item.created_at.split(" ")[0] === created_at) &&
        (total_cost === "" || item.total_cost === parseInt(total_cost)) &&
        (!status || item.status === status)
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setDeliveryOrders({
      id: "",
      customer_id: "",
      created_at: "",
      total_cost: "",
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
        className="DeliveryOrders FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="id" className="mb-2">
                id
              </label>
              <input
                type="number"
                className="form-control"
                name="id"
                id="id"
                value={deliveryOrders.id}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="customer_id" className="mb-2">
                customer id
              </label>
              <select
                className="form-control"
                name="customer_id"
                id="customer_id"
                value={deliveryOrders.customer_id}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected disabled>
                  --
                </option>
                {Object(customers).length &&
                  customers.map((customer) => (
                    <option value={customer.id} key={customer.id}>
                      {customer.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="created_at" className="mb-2">
                date
              </label>
              <input
                type="date"
                className="form-control"
                name="created_at"
                id="created_at"
                value={deliveryOrders.created_at}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="total_cost" className="mb-2">
                total_cost
              </label>
              <input
                type="number"
                className="form-control"
                name="total_cost"
                id="total_cost"
                value={deliveryOrders.total_cost}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="status" className="mb-2">
                status
              </label>
              <select
                className="form-control"
                name="status"
                id="status"
                value={deliveryOrders.status}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected disabled>
                  --
                </option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Accepted">Accepted</option>
              </select>
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
