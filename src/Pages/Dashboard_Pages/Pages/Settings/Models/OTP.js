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
              <label htmlFor="otp_type" className="form-label">
                OTP TYPE
                <span className="star">*</span>
              </label>
              <select className="form-control" name="otp_type">
                <option value="">...</option>
                <option value="1">BOTH</option>
                <option value="2">SMS</option>
                <option value="3">EMAIL</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="otp_digit_limit" className="form-label">
                OTP DIGIT LIMIT <span className="star">*</span>
              </label>
              <select className="form-control" name="otp_digit_limit">
                <option value="">...</option>
                <option value="1">4</option>
                <option value="2">6</option>
                <option value="3">8</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="otp_expire_time" className="form-label">
                OTP EXPIRE TIME <span className="star">*</span>
              </label>
              <select className="form-control" name="otp_expire_time">
                <option value="">...</option>
                <option value="1">5 MINUTE</option>
                <option value="2">10 MINUTE</option>
                <option value="3">15 MINUTE</option>
                <option value="4">20 MINUTE</option>
                <option value="5">30 MINUTE</option>
                <option value="6">60 MINUTE</option>
              </select>
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
