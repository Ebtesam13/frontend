import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Extras";
import AddRow from "../../Models/AddRow/Extras";
import EditExtra from "../../Models/Edit/EditExtras";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function Extra() {
  const componentRef = useRef();
  const [extras, setExtras] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchExtras = useCallback(async () => {
    try {
      const result = await getData("admin/extras");
      sessionStorage.removeItem("origin_data");
      setExtras(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchExtras();
  }, [fetchExtras]);

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
          url={`admin/extras/${item.id}`}
          item={item}
          updated={fetchExtras}
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
            to={`/admin/dashboard/extras/show/${item.id}`}
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
      label: "PRICE",
      key: "cost",
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
        data={extras}
        headers={headers}
        filtrated={setExtras}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchExtras}
      />

      {/* Edit Row */}
      <EditExtra
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchExtras}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={extras}
          pagination={Object(extras).length > 10}
        />
      </div>
    </div>
  );
}
