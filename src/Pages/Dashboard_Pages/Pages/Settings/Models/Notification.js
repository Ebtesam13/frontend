import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Notification() {
  return (
    <div className="AddTable">
      <div className="title">notification</div>
      <form>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_secret_key" className="form-label">
                FIREBASE SECRET KEY <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_secret_key"
                id="firebase_secret_key"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_public_vapid_key" className="form-label">
                FIREBASE PUBLIC VAPID KEY (KEY PAIR){" "}
                <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_public_vapid_key"
                id="firebase_public_vapid_key"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_api_key" className="form-label">
                FIREBASE API KEY <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_api_key"
                id="firebase_api_key"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_auth_domain" className="form-label">
                FIREBASE AUTH DOMAIN <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_auth_domain"
                id="firebase_auth_domain"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_project_id" className="form-label">
                FIREBASE PROJECT ID <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_project_id"
                id="firebase_project_id"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_storage_bucket" className="form-label">
                FIREBASE STORAGE BUCKET <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_storage_bucket"
                id="firebase_storage_bucket"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label
                htmlFor="firebase_message_sender_id"
                className="form-label"
              >
                FIREBASE MESSAGE SENDER ID <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_message_sender_id"
                id="firebase_message_sender_id"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_app_id" className="form-label">
                FIREBASE APP ID <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_app_id"
                id="firebase_app_id"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="firebase_measurement_id" className="form-label">
                FIREBASE MEASUREMENT ID <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="firebase_measurement_id"
                id="firebase_measurement_id"
                required
              />
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
