import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/TablesOrders";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData } from "../../../../axiosConfig/API";

export default function TableOrders() {
  const componentRef = useRef();
  const [tableOrders, setTableOrders] = useState([]);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);

  const fetchTableOrders = useCallback(async () => {
    try {
      const result = await getData("admin/orders");
      sessionStorage.removeItem("origin_data");
      setTableOrders(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchTableOrders();
  }, [fetchTableOrders]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CUSTOMER",
      key: "customer.id",
      dataIndex: ["customer", "name"],
    },
    {
      title: "AMOUNT",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/orders/${item.id}`}
          item={item}
          updated={fetchTableOrders}
          list={[
            { value: "Not Started", label: "Not Started" },
            { value: "In Progress", label: "In Progress" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Accepted", label: "Accepted" },
          ]}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <>
          <Link
            to={`/admin/dashboard/delivery-orders/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
        </>
      ),
    },
  ];

  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "Customer",
      key: "customer.id",
    },
    {
      label: "AMOUNT",
      key: "total_cost",
    },
    {
      label: "DATE",
      key: "data",
    },
    {
      label: "Status",
      key: "status",
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration
        handleModalToggle={handleModalToggle}
        data={tableOrders}
        headers={headers}
        filtrated={setTableOrders}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={tableOrders}
          pagination={Object(tableOrders).length > 10}
        />
      </div>
    </div>
  );
}
