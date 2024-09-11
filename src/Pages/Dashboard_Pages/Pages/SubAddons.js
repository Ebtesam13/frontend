import "./SubModels.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, addData } from "../../../axiosConfig/API";
import DeleteRecord from "./Actions/DeleteRecord";

export default function SubAddons({ order_id }) {
  const componentRef = useRef();
  const [addons, setAddons] = useState();
  const [addon_id, setAddon_id] = useState();
  const [optionsAddons, setOptionsAddons] = useState();

  const fetchAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/addons`);
      setAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchOptionsAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/options-addons`);
      setOptionsAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    if (order_id) fetchAddons(order_id);
    if (order_id) fetchOptionsAddons(order_id);
  }, [order_id, fetchAddons, fetchOptionsAddons]);

  const handleAddAddon = async (e) => {
    e.preventDefault();

    try {
      const response = await addData("admin/meals/addons", {
        addon_id: addon_id,
        meal_id: order_id,
      });

      if (response.status === "success") {
        refreshAddons(order_id);
        setAddon_id("");
        fetchOptionsAddons(order_id);
        setTimeout(() => {
          Swal.fire("Addon!", response.message, "success");
        }, 500);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  const refreshAddons = useCallback(async (order_id) => {
    if (!order_id) return;
    try {
      const result = await getData(`admin/meals/${order_id}/addons`);
      setAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "addon_id",
      key: "addon_id",
    },
    {
      title: "NAME",
      dataIndex: "addon_name",
      key: "addon_name",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <span className={item.status === 1 ? "active" : "inactive"}>
          {item.status === 1 ? "active" : "inactive"}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <DeleteRecord
          url={`admin/addons-meals/${item.addon_id}/${order_id}`}
          refreshed={() => refreshAddons(order_id)}
        />
      ),
    },
  ];

  return (
    <div className="SubModel">
      {Object(optionsAddons).length > 0 ? (
        <Row gutter={16}>
          <Col span={12}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addAddon"
            >
              add addon
            </button>
          </Col>
        </Row>
      ) : (
        false
      )}

      <div
        className="modal fade"
        id="addAddon"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addAddonLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddAddon}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addAddonLabel">
                add addon
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col col-12">
                  <div className="mb-3">
                    <label htmlFor="showAddon" className="form-label">
                      Addon <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="showAddon"
                      id="showAddon"
                      required
                      value={addon_id}
                      onChange={(e) => setAddon_id(e.target.value)}
                    >
                      <option value="" selected disabled>
                        --
                      </option>
                      {optionsAddons &&
                        optionsAddons.map((addon) => (
                          <option value={addon.id} key={addon.id}>
                            {addon.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <HiXMark />
                <span>cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="DataTable mt-3">
        <div className="tableItems" ref={componentRef}>
          <Table
            columns={columns}
            dataSource={addons}
            pagination={Object(addons).length > 10}
          />
        </div>
      </div>
    </div>
  );
}
