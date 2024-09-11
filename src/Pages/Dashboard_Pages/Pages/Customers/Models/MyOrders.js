import "../Models.css";
import { Link } from "react-router-dom";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

export default function MyOrders({ data }) {
  const [myOrder, setMyOrder] = useState();

  useEffect(() => {
    if (data) setMyOrder(data);
  }, [data]);

  const countStatus = (status) => {
    if (status === "all") {
      return Object(data).length;
    } else {
      return Object(data).length > 0
        ? data.filter((order) => order.status === status).length
        : 0;
    }
  };

  const handleFilterData = (type, id) => {
    let orders =
      type === "all" ? data : data.filter((order) => order.status === type);
    setMyOrder(Object(orders).length > 0 ? orders : []);

    let filtration = document.querySelectorAll(".statusOrderLength li");
    if (id !== 0) {
      filtration.forEach((filter) => filter.classList.remove("current"));
      let current_length = document.getElementById(`length_${id}`);
      if (current_length) current_length.classList.add("current");
    } else {
      filtration.forEach((filter) => filter.classList.remove("current"));
      filtration.forEach((filter) => filter.classList.add("showAll"));
    }
  };

  if (!data) return;

  return (
    <div className="MyOrders">
      <div className="content">
        <div className="head">
          <div>
            my orders - {Object(myOrder).length > 0 ? myOrder.length : 0}
          </div>

          <ul className="statusOrderLength">
            <li
              key="0"
              id="length_0"
              className="all"
              onClick={() => handleFilterData("all", 0)}
            >
              <span>all:</span>
              <span>{countStatus("all")}</span>
            </li>
            <li
              key="1"
              id="length_1"
              className="Accepted"
              onClick={() => handleFilterData("Accepted", 1)}
            >
              <span>Accepted:</span>
              <span>{countStatus("Accepted")}</span>
            </li>
            <li
              key="2"
              id="length_2"
              className="In Progress"
              onClick={() => handleFilterData("In Progress", 2)}
            >
              <span>In Progress:</span>
              <span>{countStatus("In Progress")}</span>
            </li>
            <li
              key="3"
              id="length_3"
              className="Not Started"
              onClick={() => handleFilterData("Not Started", 3)}
            >
              <span>Not Started:</span>
              <span>{countStatus("Not Started")}</span>
            </li>
            <li
              key="4"
              id="length_4"
              className="Cancelled"
              onClick={() => handleFilterData("Cancelled", 4)}
            >
              <span>Cancelled:</span>
              <span>{countStatus("Cancelled")}</span>
            </li>
          </ul>
        </div>

        <div className="body">
          <div className="cards">
            {Object(myOrder).length > 0 &&
              myOrder.map((order, index) => (
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
                    to={`/admin/dashboard/details-order/${order.id}`}
                    className="seeToDetails"
                  >
                    see order details
                    <IoIosArrowForward />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
