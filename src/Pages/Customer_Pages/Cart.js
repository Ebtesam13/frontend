import { useDispatch, useSelector } from "react-redux";
import CheckOutCard from "../../Components/Customer/CheckOutCard";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contextes/AuthContext";
import useAuth from "../../contextes/CustomHook";
import { emptyCart } from "../../Store/action";

export default function Cart() {
  const cartTotal = useSelector((state) => state.cartTotal);
  const cartItems = useSelector((state) => state.cartItems);
  const tableId = useSelector((state) => state.table_id);
  const tableNum = useSelector((state) => state.table_num);
  let history = useHistory();
  const dispatcher = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  let paymentData = {};

  localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // const [formData, setFormData] = useState({

  //     email: '',
  //     password: ''
  // });
  // const [errors, setErrors] = useState({
  //     emailError: "",
  //     passError: "",
  //     loginError: ""
  // })

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     setSigned(0)

  //     console.log(accessToken);

  //     try {
  //         const response = await axios.post('http://127.0.0.1:8000/api/auth/login', formData);
  //         setIsLoggedIn(true)

  //         setErrors({
  //             ...errors,
  //             loginError: ""
  //         })

  //         localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
  //         // setAccessToken(JSON.parse(localStorage.getItem('accessToken')));

  //         console.log(response.data.customer);

  //         console.log('Form submitted successfully:', response.data);
  //     } catch (error) {
  //         console.error('Error submitting form:', error);

  //         setErrors({
  //             ...errors,
  //             loginError: "invalid email or password"
  //         })
  //     }

  // };

  function inputChg(event) {
    setPaymentMethod(event.target.value);
    console.log(cartItems);
  }
  const paymentDetails = () => {
    paymentData.diningtable_id = tableId;
    paymentData.total_cost = cartTotal;
    paymentData.meal_ids = [];
    paymentData.addon_ids = [];
    paymentData.extra_ids = [];

    cartItems.map((item) => {
      if (item.table_name === "meals") {
        paymentData.meal_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
        });
      }
      if (item.table_name === "addons") {
        paymentData.addon_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
        });
      }
      if (item.table_name === "extras") {
        paymentData.extra_ids.push({
          id: item.id,
          cost: item.cost,
          quantity: item.quant,
        });
      }
    });
    if (paymentData.meal_ids.length === 0) {
      delete paymentData.meal_ids;
    }
    if (paymentData.addon_ids.length === 0) {
      delete paymentData.addon_ids;
    }
    if (paymentData.extra_ids.length === 0) {
      delete paymentData.extra_ids;
    }
    console.log(paymentData);
  };
  const checkOut = async (e) => {
    e.preventDefault();

    console.log(paymentData);
    if (JSON.parse(localStorage.getItem("CustomerToken"))) {
      console.log(accessToken);
      console.log(isLoggedIn);
      paymentDetails();
      if (paymentMethod === "dpay") {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/pay",

            paymentData,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("CustomerToken")
                )}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          window.open(response.data["Invoice Data"].Data.InvoiceURL, "_blank");

          console.log(response.data["Invoice Data"].Data.InvoiceURL);
        } catch (error) {
          console.error(error);
          if (error.response.data.message === "Unauthenticated.") {
            history.push("/customer/login");
          }
        }
      } else if (paymentMethod === "cash") {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/orders",

            paymentData,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("CustomerToken")
                )}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatcher(emptyCart());
          setIsLoggedIn(true);

          console.log(response.data);
        } catch (error) {
          console.error(error);
          console.log(error.response.data.message);
          if (error.response.data.message === "Unauthenticated.") {
            history.push("/customer/login");
          }
        }
      }
    } else if (!JSON.parse(localStorage.getItem("CustomerToken"))) {
      setIsLoggedIn(false);
      console.log(isLoggedIn);
      history.push("/customer/login");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-around container pt-5 flex-wrap">
        <div className="col-12 col-md-6 mb-4">
          <Link to="/customer/menu">
            <i className="fa-solid fa-backward pb-3"></i> Back to Home
          </Link>
          <div className="mb-4">
            <strong>
              <p>Table</p>
            </strong>
            <hr />
            <p>Inside Table-{tableNum}</p>
          </div>
          <div className="">
            <strong>
              <p>Payment</p>
            </strong>
            <hr />
            <form>
              <div className="form-check pb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="cash"
                  name="payment"
                  id="cash"
                  onChange={inputChg}
                  checked={paymentMethod === "cash"}
                />
                <label className="form-check-label" htmlFor="cash">
                  Cash
                </label>
              </div>
              <div className="form-check pb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="dpay"
                  name="payment"
                  id="dpay"
                  onChange={inputChg}
                  checked={paymentMethod === "dpay"}
                />
                <label className="form-check-label" htmlFor="dpay">
                  Digital payment
                </label>
              </div>
              <button
                type="submit"
                className="btn primary rounded-pill col-6"
                onClick={(e) => {
                  checkOut(e);
                }}
                disabled={cartItems.length === 0 ? true : false}
              >
                Place order
              </button>
              <div
                className={
                  "alert alert-info mt-3 " +
                  (isLoggedIn ? "visible" : "invisible")
                }
                role="alert"
              >
                Your order has been placed
              </div>
            </form>
          </div>
        </div>
        <div className="col-10 col-md-4 text-center mb-4">
          <strong>
            <p>Cart Summary</p>
          </strong>
          {cartItems.map((item) => (
            <CheckOutCard
              key={item.name}
              img={item.image}
              title={`${
                typeof item.size === "undefined" ? "" : item.size + "-"
              } ${item.name}`}
              price={item.cost}
              quant={item.quant}
              desc={item.description}
            />
          ))}
          <div className="border rounded p-2">
            <div className="d-flex justify-content-around">
              <span>Subtotal</span>
              <span>{cartTotal}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-around">
              <span>Total</span>
              <span>{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
