import "../Models.css";

export default function Profile({ data }) {
  if (!data) return;

  return (
    <div className="Profile">
      <div className="content">
        <div className="head">
          <div>basic information</div>
        </div>
        <div className="row">
          <div className="col col-12 col-md-6">
            <b>email</b>
            <span className="email">{data.email}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>phone</b>
            <span>{data.phone}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>status</b>
            <span>
              <span className={data.status === 1 ? "active" : "inactive"}>
                {data.status === 1 ? "active" : "inactive"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
