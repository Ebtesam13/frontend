import "./SubModels.css";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaCheckCircle, FaMapMarkedAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

export default function Branches() {
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
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
        <span>branches</span>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addSettingsBranch"
        >
          <PlusOutlined /> add branch
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
        id="addSettingsBranch"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addSettingsBranchLabel">
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
                      name <span className="star">*</span>
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
                    <label htmlFor="name" className="form-label">
                      LATITUDE/LONGITUDE <span className="star">*</span>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="latitude"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="longitude"
                      />
                      <div className="input-group-append">
                        <button className="btn btnMap">
                          <FaMapMarkedAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      email <span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control email"
                      name="email"
                      id="email"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      phone <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phone"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      city
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      id="city"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      state
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      id="state"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="zip_code" className="form-label">
                      zip code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip_code"
                      id="zip_code"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      STATUS <span className="star">*</span>
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
                    <label htmlFor="address" className="form-label">
                      address
                    </label>
                    <textarea
                      className="form-control"
                      name="address"
                      id="address"
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
