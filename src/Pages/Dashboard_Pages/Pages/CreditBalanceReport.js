import "./DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../Models/Filtration/CreditBalanceReport";

export default function CreditBalanceReport() {
  const componentRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const static_data = [
      {
        id: "1",
        name: "name",
        email: "email@email.com",
        phone: "+154545346",
        balance: "balance",
      },
      {
        id: "2",
        name: "name",
        email: "email@email.com",
        phone: "+154545346",
        balance: "balance",
      },
    ];

    if (static_data) setData(static_data);
  }, []);

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
      title: "BALANCE",
      dataIndex: "balance",
      key: "balance",
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
      label: "Balance",
      key: "balance",
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
      <Filtration data={data} headers={headers} filtrated={setData} />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={Object(data).length > 10}
        />
      </div>
    </div>
  );
}
