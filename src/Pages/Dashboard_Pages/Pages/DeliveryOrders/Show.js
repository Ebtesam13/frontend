import "./Style.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import Swal from "sweetalert2";
import {
  getData,
  updateData,
  imageStorageURL,
} from "../../../../axiosConfig/API";
import { getUser, isAuth } from "../../../../axiosConfig/Auth";
import Invoice from "../Pos/Features/Invoice";

export default function Show() {
  const { id } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [userOrder, setUserOrder] = useState(null);
  const [userAddons, setUserAddons] = useState(null);
  const [userExtras, setUserExtras] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(null);
  const [status, setStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [invoiceVisible, setInvoiceVisible] = useState(false);

  useEffect(() => {
    if (isAuth()) {
      const user = getUser();
      setUserRole(user.Role);
    }
  }, []);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setDeliveryOrder(result);
      setUserOrder(result.order_meals[0]);
      setUserAddons(result.order_addons);
      setUserExtras(result.order_extras);
      setPay(result.pay === 1 ? "Paid" : "Not Paid");
      setStatus(result.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  const handlePayChange = async (e) => {
    e.preventDefault();
    let newPay = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the pay order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("pay", newPay);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}/checkPayStatus`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setPay(newPay === "1" ? "Paid" : "Not Paid");
            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    let newStatus = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setStatus(newStatus);
            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handlePrintInvoice = () => {
    setInvoiceVisible(!invoiceVisible);
    document.body.style.overflow = invoiceVisible ? "visible" : "hidden";
  };

  if (loading || !userOrder) return;

  return (
    <>
      <div className="Show">
        <div className="head">
          <div className="details">
            <h4 className="id">
              <label>order id:</label>
              <b>#{id}</b>
              <span className={pay}>{pay}</span>
              <span className={status}>{status}</span>
            </h4>

            <div className="date">
              <span className="fs-6">
                <MdDateRange />
              </span>
              <label>{deliveryOrder.created_at}</label>
            </div>

            <div className="payment_type">
              <label>payment type:</label>
              <b>{deliveryOrder.PaymentType}</b>
            </div>

            <div className="delivery_time">
              <label>delivery time:</label>
              <b>{deliveryOrder.created_at}</b>
            </div>

            <div className="table_id">
              <label>table id:</label>
              <b>{deliveryOrder.DiningTable_id}</b>
            </div>
          </div>

          <div className="options">
            {(userRole && userRole === "admin") || userRole === "casher" ? (
              <select
                name="payment_type"
                id="payment_type"
                value={pay === "Paid" ? "1" : "0"}
                onChange={handlePayChange}
              >
                <option value="1" disabled={pay === "Paid"}>
                  Paid
                </option>
                <option value="0" disabled={pay === "Not Paid"}>
                  Not Paid
                </option>
              </select>
            ) : (
              false
            )}

            <select
              name="status"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Not Started" disabled={status === "Not Started"}>
                Not Started
              </option>
              <option value="In Progress" disabled={status === "In Progress"}>
                In Progress
              </option>
              <option value="Cancelled" disabled={status === "Cancelled"}>
                Cancelled
              </option>
              <option value="Accepted" disabled={status === "Accepted"}>
                Accepted
              </option>
            </select>

            <button
              className="btn btn-primary"
              onClick={() => handlePrintInvoice()}
            >
              <TbInvoice />
              invoice
            </button>
          </div>
        </div>

        <div className="body d-flex">
          <div className="sections sections-left">
            <div className="title">
              <b>order details</b>
            </div>

            <div className="section">
              <div className="cards">
                {/* Order */}
                {userOrder && (
                  <>
                    <h3>the order</h3>
                    <div className="card" data-id={userOrder.meal_id}>
                      <div className="card-img">
                        <img
                          loading="lazy"
                          src={`${imageStorageURL}/${userOrder.meal_image}`}
                          alt={userOrder.meal.name}
                        />
                      </div>
                      <div className="card-text">
                        <p className="name fw-bold">{userOrder.meal.name}</p>
                        <p className="quantity">
                          quantity choice:
                          <span className="fw-bold">
                            {userOrder.quantity} pcs
                          </span>
                        </p>
                        <b className="total">${userOrder.total_cost}</b>
                      </div>
                    </div>
                  </>
                )}

                {/* Addons */}
                {Object(userAddons).length > 0 &&
                  userAddons.map((addon, index) => (
                    <>
                      {index < 1 ? <h3>the addons</h3> : false}
                      <div
                        className="card"
                        data-id={addon.addon_id}
                        key={addon.id}
                      >
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${addon.addon_image}`}
                            alt={addon.addon.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{addon.addon.name}</p>
                          <p className="quantity">
                            quantity choice:
                            <span className="fw-bold">
                              {addon.quantity} pcs
                            </span>
                          </p>
                          <b className="total">${addon.total_cost}</b>
                        </div>
                      </div>
                    </>
                  ))}

                {/* Extras */}
                {Object(userExtras).length > 0 &&
                  userExtras.map((extra, index) => (
                    <>
                      {index < 1 ? <h3>the extras</h3> : false}
                      <div
                        className="card"
                        data-id={extra.extra_id}
                        key={extra.id}
                      >
                        <div className="card-img">
                          <img
                            loading="lazy"
                            src={`${imageStorageURL}/${extra.extra_image}`}
                            alt={extra.extra.name}
                          />
                        </div>
                        <div className="card-text">
                          <p className="name fw-bold">{extra.extra.name}</p>
                          <p className="quantity">
                            quantity choice:
                            <span className="fw-bold">
                              {extra.quantity} pcs
                            </span>
                          </p>
                          <b className="total">${extra.total_cost}</b>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>

          <div className="sections sections-right">
            <div className="section">
              <div className="title">
                <b>subTotal</b>
                <b>${deliveryOrder.total_cost}</b>
              </div>

              <div className="details">
                <b>total</b>
                <b>${deliveryOrder.total_cost}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Pos">
        {invoiceVisible && (
          <Invoice visible={invoiceVisible} modalClose={handlePrintInvoice} />
        )}
      </div>
    </>
  );
}
