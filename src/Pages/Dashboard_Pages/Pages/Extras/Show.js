import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import Information from "./Information";
import UploadImage from "../Actions/UploadImage";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [extra, setExtra] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExtra = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`extras/${id}`);
      setExtra(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchExtra(id);
  }, [id, fetchExtra]);

  if (loading) return;

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          <Information data={extra} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FaImage />
              Upload Image
            </span>
          }
          key="2"
        >
          <UploadImage url={`admin/extras/${id}`} data={extra} />
        </TabPane>
      </Tabs>
    </div>
  );
}
