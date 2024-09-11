import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Mail() {
  return (
    <div className="AddTable">
      <div className="title">mail</div>
      <form>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_host" className="form-label">
                MAIL HOST <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="mail_host"
                id="mail_host"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_port" className="form-label">
                MAIL PORT <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="mail_port"
                id="mail_port"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_username" className="form-label">
                MAIL USERNAME <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="mail_username"
                id="mail_username"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_password" className="form-label">
                MAIL PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                name="mail_password"
                id="mail_password"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_from_name" className="form-label">
                MAIL FROM NAME
              </label>
              <input
                type="text"
                className="form-control"
                name="mail_from_name"
                id="mail_from_name"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="mail_from_email" className="form-label">
                MAIL FROM EMAIL
              </label>
              <input
                type="text"
                className="form-control"
                name="mail_from_email"
                id="mail_from_email"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                STATUS <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input type="radio" name="status" id="status" required />
                  <span>SSL</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input type="radio" name="status" id="status" required />
                  <span>TLS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
