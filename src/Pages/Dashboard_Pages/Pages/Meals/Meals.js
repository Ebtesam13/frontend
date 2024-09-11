import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Meals";
import AddRow from "../../Models/AddRow/Meals";
import EditMeal from "../../Models/Edit/EditMeal";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function Meals() {
  const componentRef = useRef();
  const [meals, setMeals] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      const result = await getData("admin/meals");
      sessionStorage.removeItem("origin_data");
      setMeals(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

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
        <img
          loading="lazy"
          src={`${imageStorageURL}/${record}`}
          alt={record.name}
        />
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/meals/${item.id}`}
          item={item}
          updated={fetchMeals}
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
            to={`/admin/dashboard/meals/show/${item.id}`}
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
      label: "Price",
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
        data={meals}
        headers={headers}
        filtrated={setMeals}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchMeals}
      />

      {/* Edit Row */}
      <EditMeal
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchMeals}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={meals}
          pagination={Object(meals).length > 10}
        />
      </div>
    </div>
  );
}
