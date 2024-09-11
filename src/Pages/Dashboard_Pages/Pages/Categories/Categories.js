import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Categories";
import AddRow from "../../Models/AddRow/Categories";
import EditCategory from "../../Models/Edit/EditCategory";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function Categories() {
  const componentRef = useRef();
  const [categories, setCategories] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      sessionStorage.removeItem("origin_data");
      setCategories(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`categories/${item.id}`}
          item={item}
          updated={fetchCategories}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
          ]}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (record) => (
        <img
          src={`${imageStorageURL}/${record}`}
          alt={record.name}
          style={{ width: "70px", height: "auto" }}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <>
          <Link
            to={`/admin/dashboard/categories/show/${item.id}`}
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
        data={categories}
        headers={headers}
        filtrated={setCategories}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchCategories}
      />

      {/* Edit Row */}
      <EditCategory
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchCategories}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={categories}
          pagination={Object(categories).length > 10}
        />
      </div>
    </div>
  );
}
