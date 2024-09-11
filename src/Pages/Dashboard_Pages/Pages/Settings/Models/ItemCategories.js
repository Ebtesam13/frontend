import "./SubModels.css";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

export default function ItemCategories() {
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
        <span>item categories</span>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addCategory"
        >
          <PlusOutlined /> add category
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
        id="addCategory"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCategoryLabel">
                add category
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
                    <label htmlFor="image" className="form-label">
                      IMAGE (74PX,48PX) <span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      id="image"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      STATUS
                    </label>
                    <div className="row">
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="status"
                          id="status"
                          required
                        />
                        <span>active</span>
                      </div>
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="status"
                          id="status"
                          required
                        />
                        <span>inactive</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      DESCRIPTION <span className="star">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="description"
                      required
                    ></textarea>
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
