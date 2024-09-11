import "./Employees.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { IoMdNotifications } from "react-icons/io";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import profileImage from "../../../../assets/global/profile.png";
import Profile from "./Models/Profile";
import Security from "./Models/Security";
import MyOrders from "./Models/MyOrders";
import { getData } from "../../../../axiosConfig/API";

export default function Show() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(true);
  const [employeeOrders, setEmployeeOrders] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/employees/${id}`);
      setEmployee(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchEmployeeOrders = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/employees/${id}/orders`);
      setEmployeeOrders(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchEmployee(id);
    fetchEmployeeOrders(id);
  }, [id, fetchEmployee, fetchEmployeeOrders]);

  if (loading) return;

  return (
    <div className="Show">
      <div className="row">
        <div className="image">
          <img loading="lazy" src={profileImage} alt="profile" />
        </div>

        <div className="details">
          <h3>{employee.name}</h3>
          <p className="typeRole">{employee.name}</p>
        </div>
      </div>

      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane
            className="TabPane"
            tab={
              <span>
                <UserOutlined />
                profile
              </span>
            }
            key="1"
          >
            <Profile data={employee} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockFilled />
                security
              </span>
            }
            key="2"
          >
            <Security data={employee} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IoMdNotifications />
                my orders
              </span>
            }
            key="4"
          >
            <MyOrders data={employeeOrders} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
