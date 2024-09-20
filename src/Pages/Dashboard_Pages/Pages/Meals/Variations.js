import "../SubModels.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import { addData, getData, updateData } from "../../../../axiosConfig/API";

export default function Variations() {
  const { id } = useParams();
  const componentRef = useRef();
  const [variations, setVariations] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newSize, setNewSize] = useState({});
  const [sizeList, setSizeList] = useState([
    { value: 1, label: "small" },
    { value: 2, label: "medium" },
    { value: 3, label: "big" },
    { value: 4, label: "family" },
  ]);

  const [meal, setMeal] = useState({
    size: "",
    number_of_pieces: "",
    cost: "",
    meal_id: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "size") {
      setNewSize({ [name]: parseInt(value) });
    } else {
      setMeal({ ...meal, [name]: parseInt(value) });
    }
  };

  const fetchVariations = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/size-costs`);
      const sizesInResult = result.map((record) => record.size);
      const updatedSize = sizeList.filter(
        (item) => !sizesInResult.includes(item.value)
      );
      setSizeList(updatedSize);
      setVariations(result);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    fetchVariations(id);
  }, [id, fetchVariations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", newSize.value);
    formData.append("number_of_pieces", meal.number_of_pieces);
    formData.append("cost", meal.cost);
    formData.append("meal_id", meal.meal_id);

    try {
      let response;
      const method = e.target._method.value;

      if (method === "update") {
        formData.append("_method", "put");
        response = await updateData(
          `admin/meals/size-cost/${meal.id}`,
          formData,
          false
        );
      } else {
        response = await addData(`admin/meals/size-cost`, formData);
      }

      if (response.status === "success") {
        fetchVariations(id);

        if (method === "add") {
          setMeal({
            size: "",
            number_of_pieces: "",
            cost: "",
            meal_id: id,
          });
        } else {
          setMeal({ size: newSize.size });
        }

        setTimeout(() => {
          Swal.fire(
            method === "update" ? "Updated!" : "Saved!",
            response.message,
            "success"
          );
        }, 250);
      }
    } catch (error) {
      if (error.response) {
        Swal.fire("Error response:!", error.response.data.error, "error");
      } else {
        Swal.fire("Error occurred:!", error.message, "error");
      }
    }
  };

  const handleEdit = (item) => {
    setMeal(item);
    setNewSize({ value: item.size, label: convert(item.size) });
    setModalVisible(true);
  };

  const handleClose = () => {
    setMeal({
      size: "",
      number_of_pieces: "",
      cost: "",
      meal_id: id,
    });
    setNewSize({ size: "" });
    setModalVisible(false);
  };

  useEffect(() => {
    const modalElement = document.getElementById("addVariations");
    if (modalElement) {
      const myModal = new Modal(modalElement);
      if (modalVisible) {
        myModal.show();
      } else {
        myModal.hide();
      }
    }
  }, [modalVisible]);

  const convert = (value) => {
    return value === 1
      ? "small"
      : value === 2
      ? "medium"
      : value === 3
      ? "big"
      : value === 4
      ? "family"
      : "none";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "SIZE",
      key: "size",
      render: (item) => convert(item.size),
    },
    {
      title: "Number of pieces",
      dataIndex: "number_of_pieces",
      key: "number_of_pieces",
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <Link
          to="#"
          className="editIcon"
          data-tooltip="edit"
          onClick={() => handleEdit(item)}
          style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
        >
          <FiEdit />
        </Link>
      ),
    },
  ];

  return (
    <div className="SubModel">
      {Object(sizeList).length > 0 ? (
        <Row gutter={16}>
          <Col span={16}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addVariations"
            >
              add variations
            </button>
          </Col>
        </Row>
      ) : (
        false
      )}

      <div
        className="modal fade"
        id="addVariations"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addVariationsLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addVariationsLabel">
                {modalVisible ? "update" : "add"} variations
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {Object(sizeList).length > 0 && (
                  <div className="col col-12 col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="size" className="form-label">
                        SIZE {!modalVisible && <span className="star">*</span>}
                      </label>
                      <select
                        className="form-control"
                        name="size"
                        id="size"
                        value={newSize.size}
                        onChange={(e) => handleChange(e)}
                        
                        required
                      >
                        {!modalVisible && (
                          <option value="" selected>
                            --
                          </option>
                        )}

                        {modalVisible && (
                          <option value={meal.size} key="0" selected>
                            {convert(parseInt(meal.size))}
                          </option>
                        )}

                        {sizeList.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="number_of_pieces" className="form-label">
                      NUMBER OF PIECES
                      {!modalVisible && <span className="star">*</span>}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_pieces"
                      id="number_of_pieces"
                      value={meal.number_of_pieces}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="cost" className="form-label">
                      PRICE {!modalVisible && <span className="star">*</span>}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cost"
                      id="cost"
                      value={meal.cost}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <input
                type="hidden"
                name="_method"
                id="_method"
                value={modalVisible ? "update" : "add"}
              />

              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <HiXMark />
                <span>cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="DataTable mt-3">
        <div className="tableItems" ref={componentRef}>
          <Table
            columns={columns}
            dataSource={variations}
            pagination={Object(variations).length > 9}
          />
        </div>
      </div>
    </div>
  );
}
