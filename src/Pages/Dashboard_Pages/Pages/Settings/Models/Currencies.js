import "./SubModels.css";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

export default function Currencies() {
  const data = [];

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
      title: "SYMBOL",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "IS CRYPTOCURRENCY",
      dataIndex: "is_cryptocurrency",
      key: "is_cryptocurrency",
    },
    {
      title: "EXCHANGE RATE",
      dataIndex: "exchange_RATE",
      key: "exchange_RATE",
    },
    {
      title: "ACTION",
      key: "action",
      render: () => (
        <>
          <button className="eyeIcon" data-tooltip="view">
            <BsEye />
          </button>
          <button className="editIcon" data-tooltip="edit">
            <FiEdit />
          </button>
          <button className="trashIcon" data-tooltip="delete">
            <BiTrash />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="AddTable">
      <div className="title">
        <span>currencies</span>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addCurrency"
        >
          <PlusOutlined /> add currency
        </button>
      </div>

      <div className="data">
        <Table
          className="tableItems"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>

      <div
        className="modal fade"
        id="addCurrency"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCurrencyLabel">
                add branch
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      NAME <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="symbol" className="form-label">
                      SYMBOL <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="symbol"
                      id="symbol"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">
                      CODE <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      id="code"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="is_cryptocurrency" className="form-label">
                      IS CRYPTOCURRENCY
                    </label>
                    <div className="row">
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="is_cryptocurrency"
                          id="is_cryptocurrency"
                          required
                        />
                        <span>YES</span>
                      </div>
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="is_cryptocurrency"
                          id="is_cryptocurrency"
                          required
                        />
                        <span>NO</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exchange_rate" className="form-label">
                      EXCHANGE RATE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="exchange_rate"
                      id="exchange_rate"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer btnModels">
              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span className="ps-2">save</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <HiXMark />
                <span className="ps-2">close</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
