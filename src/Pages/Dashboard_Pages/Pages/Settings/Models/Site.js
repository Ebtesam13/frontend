import "./SubModels.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Site() {
  return (
    <div className="AddTable">
      <div className="title">site</div>
      <form>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="data_format" className="form-label">
                DATE FORMAT <span className="star">*</span>
              </label>
              <select className="form-control" name="data_format">
                <option value="">...</option>
                <option value="1">d-m-Y (30-06-2024)</option>
                <option value="2">m-d-Y (06-30-2024)</option>
                <option value="3">Y-m-d (2024-06-30)</option>
                <option value="4">d.m.Y (30.06.2024)</option>
                <option value="5">m.d.Y (06.30.2024)</option>
                <option value="6">Y.m.d (2024.06.30)</option>
                <option value="7">d/m/Y (30/06/2024)</option>
                <option value="8">m/d/Y (06/30/2024)</option>
                <option value="9">Y/m/d (2024/06/30)</option>
                <option value="10">d-M-Y (30-Jun-2024)</option>
                <option value="11">d/M/Y (30/Jun/2024)</option>
                <option value="12">d.M.Y (30.Jun.2024)</option>
                <option value="13">d M Y (30 Jun 2024)</option>
                <option value="14">d F, Y (30 June, 2024)</option>
                <option value="15">d D M Y (30 Sun Jun 2024)</option>
                <option value="16">D d M Y (Sun 30 Jun 2024)</option>
                <option value="17">dS M Y (1st Jun 2024)</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="time_format" className="form-label">
                TIME FORMAT <span className="star">*</span>
              </label>
              <select className="form-control" name="time_format">
                <option value="">...</option>
                <option value="1">12 Hour (05:12 PM)</option>
                <option value="2">12 Hour (05:12 pm)</option>
                <option value="3">24 Hour (17:12)</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="default_timezone" className="form-label">
                DEFAULT TIMEZONE <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="default_timezone"
                id="default_timezone"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="default_branch" className="form-label">
                DEFAULT BRANCH <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="default_branch"
                id="default_branch"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="default_sms_gateway" className="form-label">
                DEFAULT SMS GATEWAY <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="default_sms_gateway"
                id="default_sms_gateway"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                PHONE <span className="star">*</span>
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
              <label htmlFor="copyright" className="form-label">
                COPYRIGHT <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="copyright"
                id="copyright"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="google_map_key" className="form-label">
                GOOGLE MAP KEY <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="google_map_key"
                id="google_map_key"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="google_map_key" className="form-label">
                DIGIT AFTER DECIMAL POINT <span>( EX: 0.00 )</span>
                <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="google_map_key"
                id="google_map_key"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="default_currency" className="form-label">
                DEFAULT CURRENCY <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="default_currency"
                id="default_currency"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="food_preparation_time" className="form-label">
                FOOD PREPARATION TIME <span>( IN MINUTE )</span>
                <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="food_preparation_time"
                id="food_preparation_time"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="currency_position" className="form-label">
                CURRENCY POSITION <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="currency_position"
                    id="currency_position"
                    required
                  />
                  <span>() left</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="currency_position"
                    id="currency_position"
                    required
                  />
                  <span>() right</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="online_payment_gateway" className="form-label">
                ONLINE PAYMENT GATEWAY <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="online_payment_gateway"
                    id="online_payment_gateway"
                    required
                  />
                  <span>Enable</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="online_payment_gateway"
                    id="online_payment_gateway"
                    required
                  />
                  <span>Disable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="email_verification" className="form-label">
                EMAIL VERIFICATION <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="email_verification"
                    id="email_verification"
                    required
                  />
                  <span>Enable</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="email_verification"
                    id="email_verification"
                    required
                  />
                  <span>Disable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="phone_verification" className="form-label">
                PHONE VERIFICATION <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="phone_verification"
                    id="phone_verification"
                    required
                  />
                  <span>Enable</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="phone_verification"
                    id="phone_verification"
                    required
                  />
                  <span>Disable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="app_debug" className="form-label">
                APP DEBUG <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="app_debug"
                    id="app_debug"
                    required
                  />
                  <span>Enable</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="app_debug"
                    id="app_debug"
                    required
                  />
                  <span>Disable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="auto_update" className="form-label">
                AUTO UPDATE <span className="star">*</span>
              </label>
              <div className="row">
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="auto_update"
                    id="auto_update"
                    required
                  />
                  <span>Enable</span>
                </div>
                <div className="col col-4 d-flex gap-2 align-items-center">
                  <input
                    type="radio"
                    name="auto_update"
                    id="auto_update"
                    required
                  />
                  <span>Disable</span>
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
