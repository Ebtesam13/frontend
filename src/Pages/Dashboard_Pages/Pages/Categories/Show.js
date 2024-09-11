import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import { FaInfoCircle, FaImage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Information from "./Information";
import UploadImage from "../Actions/UploadImage";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategory = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`categories/${id}`);
      setCategory(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchCategory(id);
  }, [id, fetchCategory]);

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
          <Information data={category} />
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
          <UploadImage url={`categories/${id}`} data={category} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
