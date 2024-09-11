import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../Models/Filtration/Transactions";
import { getData } from "../../../axiosConfig/API";

export default function Transactions() {
  const componentRef = useRef();
  const [transactions, setTransaction] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const result = await getData("admin/transactions");
      sessionStorage.removeItem("origin_data");
      setTransaction(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "PAYMENT METHOD",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "ORDER ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "AMOUNT",
      key: "amount",
      render: (item) => (
        <span
          className={
            parseFloat(item.amount) === 0
              ? "not_value"
              : parseFloat(item.amount) > 0
              ? "active"
              : "inactive"
          }
        >
          {item.amount}
        </span>
      ),
    },
  ];

  const headers = [
    {
      label: "Id",
      key: "id",
    },
    {
      label: "Date",
      key: "created_at",
    },
    {
      label: "Payment Method",
      key: "payment_method",
    },
    {
      label: "Order Id",
      key: "order_id",
    },
    {
      label: "Amount",
      key: "amount",
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
        data={transactions}
        headers={headers}
        filtrated={setTransaction}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={Object(transactions).length > 10}
        />
      </div>
    </div>
  );
}
