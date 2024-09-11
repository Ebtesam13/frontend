import "./DetailsOrder.css";
import { useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import Customers from "./Customers";
import ProgressOrder from "./ProgressOrder";
import { getData, imageStorageURL } from "../../../../axiosConfig/API";

export default function DetailsOrder() {
  const currentStep = 4;
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [userAddons, setUserAddons] = useState(null);
  const [userExtras, setUserExtras] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setUserOrder(result.order_meals[0]);
      setUserAddons(result.order_addons);
      setUserExtras(result.order_extras);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  if (loading || !userOrder) return;

  return (
    <div className="DataTable DetailsOrder">
      <div className="Breadcrumb">
        <div className="col-12 p-0 mb-3">
          <ul>
            <li>
              <Link to="/admin/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>
              <Link to="/admin/dashboard/customers" element={<Customers />}>
                customers
              </Link>
            </li>
            <span> / </span>
            <li>details order</li>
          </ul>
        </div>
      </div>

      <div className="sections">
        <div className="section">
          <div className="timeLine-details">
            <p>
              <label>order id:</label>
              <b>#{userOrder.id}</b>
            </p>
            <p>{userOrder.created_at}</p>
            <p>
              <b>order type: </b>
              <span style={{ "--c": "#1772FF", "--bg": "#E8F2FF" }}>
                {"delivery"}
              </span>
            </p>
          </div>
          <div className="timeLine-points">
            <div className="points">
              <ProgressOrder currentStep={currentStep} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="order-details">
            <b>order details</b>
            <div className="cards">
              {/* Order */}
              {userOrder && (
                <div className="card" data-id={userOrder.meal_id}>
                  <div className="card-img">
                    <img
                      loading="lazy"
                      src={`${imageStorageURL}/${userOrder.meal.image}`}
                      alt={userOrder.meal.name}
                    />
                  </div>
                  <div className="card-text">
                    <p className="name fw-bold">{userOrder.meal.name}</p>
                    <p className="quantity">
                      quantity choice:
                      <span className="fw-bold">{userOrder.quantity} pcs</span>
                    </p>
                    <b className="total">${userOrder.total_cost}</b>
                  </div>
                </div>
              )}

              {/* Addons */}
              {Object(userAddons).length > 0 &&
                userAddons.map((addon, index) => (
                  <>
                    {index < 1 ? <h5 className="mt-2">the addons</h5> : false}
                    <div className="card" data-id={addon.addon_id}>
                      <div className="card-img">
                        <img
                          loading="lazy"
                          src={`${imageStorageURL}/${addon.addon.image}`}
                          alt={addon.addon.name}
                        />
                      </div>
                      <div className="card-text">
                        <p className="name fw-bold">{addon.addon.name}</p>
                        <p className="quantity">
                          quantity choice:
                          <span className="fw-bold">{addon.quantity} pcs</span>
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
                    {index < 1 ? <h5 className="mt-2">the extras</h5> : false}
                    <div className="card" data-id={extra.extra_id}>
                      <div className="card-img">
                        <img
                          loading="lazy"
                          src={`${imageStorageURL}/${extra.extra.image}`}
                          alt={extra.extra.name}
                        />
                      </div>
                      <div className="card-text">
                        <p className="name fw-bold">{extra.extra.name}</p>
                        <p className="quantity">
                          quantity choice:
                          <span className="fw-bold">{extra.quantity} pcs</span>
                        </p>
                        <b className="total">${extra.total_cost}</b>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="delivery-address">
            <b>delivery address</b>
            <p>lorem lorem lorem lorem lorem</p>
          </div>
        </div>

        <div className="section">
          <div className="payment-info">
            <p>
              <b>method:</b> {"paypal (4864464354)"}
            </p>
            <p>
              <b>status:</b> <span>{"paid"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
