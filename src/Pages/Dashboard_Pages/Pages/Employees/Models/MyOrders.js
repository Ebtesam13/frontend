import "../Models.css";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

export default function MyOrders({ data }) {
  const countStatus = (status) => {
    return Array.isArray(data)
      ? data.filter((order) => order.status === status).length
      : 0;
  };

  if (!data) return;

  return (
    <div className="MyOrders">
      <div className="content">
        <div className="head">
          <div>my orders - {Array.isArray(data) ? data.length : 0}</div>

          <ul className="statusOrderLength">
            <li key="1">
              <span className="Accepted">Accepted:</span>
              <span>{countStatus("Accepted")}</span>
            </li>
            <li key="2">
              <span className="In Progress">In Progress:</span>
              <span>{countStatus("In Progress")}</span>
            </li>
            <li key="3">
              <span className="Not Started">Not Started:</span>
              <span>{countStatus("Not Started")}</span>
            </li>
            <li key="4">
              <span className="Cancelled">Cancelled:</span>
              <span>{countStatus("Cancelled")}</span>
            </li>
          </ul>
        </div>

        <div className="body">
          <div className="cards">
            {Array.isArray(data) ? (
              data.map((order, index) => (
                <div className="card" key={index}>
                  <div className="card-icon">
                    <BiSolidDish />
                  </div>
                  <div className="card-body">
                    <div className="id">
                      <label>order id:</label>
                      <b>#{order.id}</b>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="quantity">2 items</div>
                    <div className="date">{order.created_at}</div>
                    <div className="total">
                      <label>total:</label>
                      <b>${order.total_cost}</b>
                    </div>
                  </div>
                  <Link
                    to="/admin/dashboard/details-order/2/5"
                    className="seeToDetails"
                  >
                    see order details
                    <IoIosArrowForward />
                  </Link>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
