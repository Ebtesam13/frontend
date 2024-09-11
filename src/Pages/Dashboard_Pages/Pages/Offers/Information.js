import { Row, Col } from "antd";

export default function Information({ data }) {
  if (!data) return;

  return (
    <div className="Information">
      <Row gutter={16}>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>name</label>
            <span>{data.name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>discount</label>
            <span>{data.discount}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>startDate</label>
            <span>{data.startDate}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>endDate</label>
            <span>{data.endDate}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Name</label>
            <span>{data.name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Status</label>
            <span
              className={
                data.status === "active" || data.status === 1
                  ? "active"
                  : "inactive"
              }
            >
              {data.status === "active" || data.status === 1
                ? "active"
                : "inactive"}
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
