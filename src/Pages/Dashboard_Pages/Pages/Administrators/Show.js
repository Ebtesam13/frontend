import "./Administrators.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { IoMdNotifications } from "react-icons/io";
import profileImage from "../../../../assets/global/profile.png";
import Profile from "./Models/Profile";
import Security from "./Models/Security";
import MyOrders from "./Models/MyOrders";
import { getData } from "../../../../axiosConfig/API";

export default function Show() {
  const { id } = useParams();
  const [administrator, setAdministrator] = useState(true);
  const [administratorOrders, setAdministratorOrders] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchAdministrator = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/administrators/${id}`);
      setAdministrator(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchAdministratorOrders = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/administrators/${id}/orders`);
      setAdministratorOrders(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchAdministrator(id);
    fetchAdministratorOrders(id);
  }, [id, fetchAdministrator, fetchAdministratorOrders]);

  if (loading) return;

  return (
    <div className="Show">
      <div className="row">
        <div className="image">
          <img loading="lazy" src={profileImage} alt="profile" />
        </div>

        <div className="details">
          <h3>{administrator.name}</h3>
          <p className="typeRole">admin</p>
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
            <Profile data={administrator} />
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
            <Security data={administrator} />
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
            <MyOrders data={administratorOrders} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
