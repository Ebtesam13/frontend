import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function License() {
  return (
    <div className="AddTable">
      <div className="title">license</div>
      <form>
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="license_key" className="form-label">
                LICENSE KEY <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="license_key"
                id="license_key"
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
