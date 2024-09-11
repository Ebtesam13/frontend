import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Company() {
  return (
    <div className="AddTable">
      <div className="title">company</div>
      <form>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="email"
                id="email"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                phone <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                website
              </label>
              <input
                type="text"
                className="form-control"
                name="website"
                id="website"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                city
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                id="city"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                status
              </label>
              <input
                type="text"
                className="form-control"
                name="status"
                id="status"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="country_code" className="form-label">
                country code
              </label>
              <input
                type="text"
                className="form-control"
                name="country_code"
                id="country_code"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="zip_code" className="form-label">
                zip code
              </label>
              <input
                type="text"
                className="form-control"
                name="zip_code"
                id="zip_code"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                address
              </label>
              <textarea
                className="form-control"
                name="address"
                id="address"
                required
              ></textarea>
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
