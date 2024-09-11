import "../DataTable.css";
import "./QrCode.css";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import Logo from "../../../../assets/global/logo.png";
import Dashboard from "../Dashboard";
import { QRCodeCanvas } from "qrcode.react";
import { getData } from "../../../../axiosConfig/API";

export default function Show() {
  const { id } = useParams();
  const [diningTable, setDiningTable] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDiningTable = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`dining-tables/${id}`);
      setDiningTable(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchDiningTable(id);
  }, [id, fetchDiningTable]);

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

  if (loading) return;

  return (
    <div className="Show">
      <div className="Breadcrumb">
        <div className="col-12 p-0">
          <ul>
            <li>
              <Link to="/admin/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>dining table</li>
            <span> / </span>
            <li>show</li>
          </ul>
        </div>
      </div>

      <div className="qrCodeComponent">
        <div className="qrCode-head">
          <label>dining table</label>
          <div className="d-flex gap-2 alien-center">
            {diningTable?.qr_code_link ||
              (diningTable?.qr_code && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => downloadQRCode(diningTable)}
                >
                  <DownloadOutlined />
                  Qr Code Download
                </button>
              ))}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => window.print()}
            >
              <PrinterOutlined />
              print
            </button>
          </div>
        </div>

        <div className="qrCode-body">
          <div className="logo">
            <img loading="lazy" src={Logo} alt="Logo" />
          </div>
          <p>mirpur 1 (main)</p>
          <p>+48446843546</p>
          <p>house: 25, road no: 2, block a, mirpur-1, dhaka 1216</p>

          <div className="qrCode">
            {diningTable?.qr_code_link || diningTable?.qr_code ? (
              <QRCodeCanvas
                id={`canvas_${diningTable.id}`}
                value={
                  diningTable?.qr_code_link ||
                  diningTable?.qr_code.replace("?", "/")
                }
              />
            ) : (
              <span>no qr code</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
