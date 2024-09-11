import { Link } from "react-router-dom";
import logo1 from "../../Images/col1.png";

import { useDispatch, useSelector } from "react-redux";
import { EmptyCart } from "./EmptyCart";
import FullCart from "./FullCart";
import { search } from "../../Store/action";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

export function Navbar() {
  const dispatcher = useDispatch();
  const cartTotal = useSelector((state) => state.cartTotal);
  const cartItems = useSelector((state) => state.cartItems);
  console.log(cartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
  }, [cartTotal]);

  const handelSearch = (e) => {
    dispatcher(search(e.target.value));
  };

  const history = useHistory();

  const handleNavigation = () => {
    history.push("/customer/checkout");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light  d-flex justify-content-between py-0">
        <Link to="/customer/menu">
          <a className="navbar-brand" href="/">
            <img src={logo1} height={45}></img>
          </a>
        </Link>

        <div className="d-flex justify-content-around">
          <input
            className="form-control me-2 col-8 rounded-pill"
            type="search"
            placeholder="Search"
            onChange={handelSearch}
          />

          <button
            className="btn btn-dark rounded-pill"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fa-solid fa-bag-shopping pr-1"></i>{" "}
            <strong>{cartTotal} OMR</strong>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 id="offcanvasRightLabel" className="mx-auto fw-bolder">
            My Cart
          </h3>
          <button
            type="button"
            className="btn btn-danger rounded-circle fw-bolder exit-cart"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <div className="offcanvas-body body">
          {cartItems.length === 0 ? <EmptyCart /> : <FullCart />}
        </div>
        <div className={cartItems.length === 0 ? "invisible" : ""}>
          <div className="d-flex justify-content-evenly gap-2 rounded-pill p-3 mb-3 border border-gray-1 ">
            <h6 className="capitalize text-sm font-medium ">Subtotal</h6>
            <h6 className="text-success">
              <strong>{cartTotal} OMR</strong>
            </h6>
          </div>
          '
          <button
            className="btn primary rounded-pill col-12 m-2 p-3"
            onClick={handleNavigation}
            data-bs-dismiss="offcanvas"
          >
            Proceed to CheckOut
          </button>
        </div>
      </div>
    </>
  );
}
