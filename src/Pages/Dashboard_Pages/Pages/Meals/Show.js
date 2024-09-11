import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import {
  FaInfoCircle,
  FaImage,
  FaThLarge,
  FaPlus,
  FaPuzzlePiece,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Information from "./Information";
import UploadImage from "../Actions/UploadImage";
import Variations from "./Variations";
import SubExtra from "../SubExtras";
import SubAddon from "../SubAddons";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeal = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`meals/${id}`);
      setMeal(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMeal(id);
  }, [id, fetchMeal]);

  if (loading) return;

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          {meal && <Information data={meal} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaImage />
              Upload Image
            </span>
          }
          key="2"
        >
          <UploadImage url={`admin/meals/${id}`} data={meal} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaThLarge />
              Variations
            </span>
          }
          key="3"
        >
          <Variations />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPlus />
              Extra
            </span>
          }
          key="4"
        >
          <SubExtra order_id={id} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPuzzlePiece />
              Addon
            </span>
          }
          key="5"
        >
          <SubAddon order_id={id} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
