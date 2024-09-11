import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/Offers";
import AddRow from "../../Models/AddRow/Offers";
import EditOffer from "../../Models/Edit/EditOffer";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData } from "../../../../axiosConfig/API";

export default function Offers() {
  const componentRef = useRef();
  const [offers, setOffers] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchOffers = useCallback(async () => {
    try {
      const result = await getData("admin/offers");
      sessionStorage.removeItem("origin_data");
      setOffers(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const handleModalEditToggle = () => {
    setEditItem(null);
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
      title: "DISCOUNT",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "START DATE",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "END DATE",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/offers/${item.id}`}
          item={item}
          updated={fetchOffers}
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
            to={`/admin/dashboard/offers/show/${item.id}`}
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
      label: "Discount",
      key: "discount",
    },
    {
      label: "Start Date",
      key: "start_date",
    },
    {
      label: "End Date",
      key: "end_date",
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
        data={offers}
        headers={headers}
        filtrated={setOffers}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchOffers}
      />

      {/* Edit Row */}
      <EditOffer
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchOffers}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={offers}
          pagination={Object(offers).length > 10}
        />
      </div>
    </div>
  );
}
