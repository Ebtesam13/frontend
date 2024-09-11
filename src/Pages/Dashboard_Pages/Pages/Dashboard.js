import "./Dashboard.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { BsFront } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiMoneyDollarCircleFill, RiAlignItemLeftFill } from "react-icons/ri";
import LineChartComponent from "./Charts/LineChartComponent";
import AreaChartComponent from "./Charts/AreaChartComponent";
import ImageTest from "../../../assets/global/profile.png";

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());

  const data = [
    { date: "2024-07-01", sales: 4.5 },
    { date: "2024-07-02", sales: 0.0 },
    { date: "2024-07-03", sales: 0.0 },
    { date: "2024-07-04", sales: 0.0 },
  ];

  const cards = [
    {
      id: 1,
      image: ImageTest,
      title: "title 1",
      price: "$452",
    },
    {
      id: 2,
      image: ImageTest,
      title: "title 2",
      price: "$452",
    },
    {
      id: 3,
      image: ImageTest,
      title: "title 3",
      price: "$452",
    },
    {
      id: 4,
      image: ImageTest,
      title: "title 4",
      price: "$452",
    },
    {
      id: 5,
      image: ImageTest,
      title: "title 5",
      price: "$452",
    },
    {
      id: 6,
      image: ImageTest,
      title: "title 6",
      price: "$452",
    },
    {
      id: 7,
      image: ImageTest,
      title: "title 7",
      price: "$452",
    },
    {
      id: 8,
      image: ImageTest,
      title: "title 8",
      price: "$452",
    },
  ];

  return (
    <div className="Dashboard">
      <div className="reminder alert-danger p-3 rounded-2 mb-3">
        <p>reminder!</p>
        <p className="text-secondary">
          dummy data will be reset in every <b>30</b> minutes.
        </p>
      </div>

      <div className="welcome-user pl-2 pr-2 mb-5">
        <h3>good morning!</h3>
        <h4>john doe</h4>
      </div>

      <div className="datePicker mb-3 pl-2 pr-2">
        <DatePicker
          className="picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <h4>overview!</h4>
      </div>

      <div className="row totalCarts pl-2 pr-2">
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <RiMoneyDollarCircleFill />
            </div>
            <h6 className="text-white">Total Sales</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <BsFront />
            </div>
            <h6 className="text-white">Total Orders</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <FaUserGroup />
            </div>
            <h6 className="text-white">Total Customers</h6>
          </div>
        </div>
        <div className="col col-12 col-sm-6 col-xl-3 p-2">
          <div className="d-flex align-items-center gap-2 p-3 rounded-2">
            <div className="icon">
              <RiAlignItemLeftFill />
            </div>
            <h6 className="text-white">Total Menu Items</h6>
          </div>
        </div>
      </div>

      <div className="row chartParent">
        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <DatePicker
                className="picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <h5>sales summary</h5>
            </div>

            <div className="section-body">
              <ul>
                <li>
                  <div>
                    <IoStatsChart />
                    <p>total sales</p>
                  </div>
                </li>
                <li>
                  <div>
                    <IoStatsChart />
                    <p>avg. sales per day</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="section-chart">
              <LineChartComponent data={data} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <DatePicker
                className="picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <h5>order stats</h5>
            </div>

            <div className="section-body"></div>

            <div className="section-chart">
              <AreaChartComponent />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <h5>featured items</h5>
            </div>
            <div className="section-body">
              <div className="cards">
                {cards.map((card, index) => (
                  <Link
                    to={`/admin/dashboard/meals/show/${card.id}`}
                    className="card"
                    key={index}
                  >
                    <div className="card-img">
                      <img loading="lazy" src={card.image} alt={card.title} />
                    </div>
                    <div className="card-title">{card.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 pl-3 pr-3 mb-4">
          <div className="section">
            <div className="section-head">
              <h5>most popular items</h5>
            </div>
            <div className="section-body">
              <div className="cards popular">
                {cards.map((card, index) => (
                  <Link
                    to={`/admin/dashboard/meals/show/${card.id}`}
                    className="card"
                    key={index}
                  >
                    <div className="card-img">
                      <img loading="lazy" src={card.image} alt={card.title} />
                    </div>
                    <div className="card-text">
                      <p>{card.title}</p>
                      <p>lorem lorem</p>
                      <p>{card.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
