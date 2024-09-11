import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { MdQrCode2 } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../Models/Filtration/DiningTables";
import AddRow from "../../Models/AddRow/DiningTables";
import EditDiningTable from "../../Models/Edit/EditDiningTable";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";
import { getData } from "../../../../axiosConfig/API";

export default function DiningTables() {
  const componentRef = useRef(null);
  const qrRef = useRef(null);
  const [diningTables, setDiningTables] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchDiningTables = useCallback(async () => {
    try {
      const result = await getData("admin/dining-tables");
      sessionStorage.removeItem("origin_data");
      setDiningTables(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchDiningTables();
  }, [fetchDiningTables]);

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

  const downloadQRCode = (item) => {
    const canvas = document.getElementById(`canvas_${item.id}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `customer_menu_table_${item.id}.png`;
      link.click();
    } else {
      console.error("Canvas not found for item:", item.id);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NUMBER",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "FLOOR",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/dining-tables/${item.id}`}
          item={item}
          updated={fetchDiningTables}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
          ]}
        />
      ),
    },
    {
      title: "QR CODE",
      dataIndex: "qr_code",
      key: "qr_code",
      render: (text, item) => {
        return (
          <div ref={qrRef} className="customQrCode">
            {item?.qr_code_link ? (
              <QRCodeCanvas
                id={`canvas_${item.id}`}
                value={item.qr_code_link.replace("?", "/")}
              />
            ) : (
              <span>no qr code {item.status} </span>
            )}
          </div>
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <div className="actionResource">
          <Link
            to={`/admin/dashboard/dining-tables/show/${item.id}`}
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
          {item.qr_code_link && (
            <Link
              to="#"
              className="qrCodeIcon"
              data-tooltip="download"
              onClick={() => downloadQRCode(item)}
              style={{ "--c": "#ecbf1d", "--bg": "#fff6c8" }}
            >
              <MdQrCode2 />
            </Link>
          )}
        </div>
      ),
    },
  ];

  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "Number",
      key: "num",
    },
    {
      label: "Size",
      key: "size",
    },
    {
      label: "Floor",
      key: "floor",
    },
    {
      label: "Qr Code",
      key: "qr_code",
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
        data={diningTables}
        headers={headers}
        filtrated={setDiningTables}
      />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchDiningTables}
      />

      {/* Edit Row */}
      <EditDiningTable
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchDiningTables}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={diningTables}
          pagination={Object(diningTables).length > 10}
        />
      </div>
    </div>
  );
}
