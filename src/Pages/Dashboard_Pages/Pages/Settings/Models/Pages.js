import "./SubModels.css";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
import ReactQuill from "react-quill";

export default function Pages() {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
  ];

  const data = [];

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "TAX RATE",
      dataIndex: "tax rate",
      key: "tax rate",
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
        <span>pages</span>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addPage"
        >
          <PlusOutlined /> add page
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
        id="addPage"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPageLabel">
                add tax
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
                    <label htmlFor="title" className="form-label">
                      TITLE <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      id="title"
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

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="menu_template" className="form-label">
                      MENU TEMPLATE <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="menu_template"
                      id="menu_template"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      IMAGE <span className="star">*</span>
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

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      DESCRIPTION <span className="star">*</span>
                    </label>

                    <ReactQuill
                      className="textEditor"
                      id="description"
                      modules={modules}
                      formats={formats}
                      placeholder="Insert content here ..."
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
