import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Addons";
import AddRow from "../../Models/AddRow/Addons";
import EditAddon from "../../Models/Edit/EditAddon";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function Addon() {
  const componentRef = useRef();
  const [addons, setAddons] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchAddons = useCallback(async () => {
    try {
      const result = await getData("admin/addons");
      sessionStorage.removeItem("origin_data");
      setAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchAddons();
  }, [fetchAddons]);

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
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (record) => (
        <img src={`${imageStorageURL}/${record}`} alt={record.name} />
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/addons/${item.id}`}
          item={item}
          updated={fetchAddons}
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
            to={`/admin/dashboard/addons/show/${item.id}`}
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
      label: "Category",
      key: "category_name",
    },
    {
      label: "Status",
      key: "status",
    },
  ];

  return (
    <div className="DataTable">
      <Breadcrumb />

      {/* Filtration */}
      <Filtration
        handleModalToggle={handleModalToggle}
        data={addons}
        headers={headers}
        filtrated={setAddons}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchAddons}
      />

      {/* Edit Row */}
      <EditAddon
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchAddons}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={addons}
          pagination={Object(addons).length > 10}
        />
      </div>
    </div>
  );
}
