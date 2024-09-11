import { Row, Col } from "antd";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

export default function Information({ data }) {
  if (!data) return;

  return (
    <div className="Information">
      <Row gutter={16}>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Name</label>
            <span>{data.name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Status</label>
            <UpdateMultiStatus
              url={`categories/${data.id}`}
              item={data}
              list={[
                { value: 1, label: "active" },
                { value: 0, label: "inactive" },
              ]}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Description</label>
            <span>{data.description}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
