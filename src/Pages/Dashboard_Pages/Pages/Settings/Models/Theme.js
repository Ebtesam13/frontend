import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Analytics() {
  return (
    <div className="AddTable">
      <div className="title">analytics</div>
      <form>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="logo" className="form-label">
                LOGO (128PX,43PX)
              </label>
              <input
                type="file"
                className="form-control"
                name="logo"
                id="logo"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="fav_icon" className="form-label">
                FAV ICON (120PX,120PX)
              </label>
              <input
                type="file"
                className="form-control"
                name="fav_icon"
                id="fav_icon"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="footer_logo" className="form-label">
                FOOTER LOGO (144PX,48PX)
              </label>
              <input
                type="file"
                className="form-control"
                name="footer_logo"
                id="footer_logo"
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
