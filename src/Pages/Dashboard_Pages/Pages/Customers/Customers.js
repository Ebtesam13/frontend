import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Customers";
import AddRow from "../../Models/AddRow/Customers";
import EditCustomer from "../../Models/Edit/EditCustomer";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData } from "../../../../axiosConfig/API";

export default function Customers() {
  const componentRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      const result = await getData("admin/customers");
      sessionStorage.removeItem("origin_data");
      setCustomers(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const handleModalEditToggle = () => {
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
  };

  const handleEdit = async (item) => {
    setEditItem(item);
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/customers/${item.id}`}
          item={item}
          updated={fetchCustomers}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
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
            to={`/admin/dashboard/customers/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
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
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Phone",
      key: "phone",
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
        data={customers}
        headers={headers}
        filtrated={setCustomers}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchCustomers}
      />

      {/* Edit Row */}
      <EditCustomer
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchCustomers}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={customers}
          pagination={Object(customers).length > 10}
        />
      </div>
    </div>
  );
}
