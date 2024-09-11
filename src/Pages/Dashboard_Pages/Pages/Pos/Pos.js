import "./Pos.css";
import "../DataTable.css";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillShopping } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import AddCustomer from "./Features/AddCustomer";
import CartItems from "./Features/CartItems";
import Pagination from "../Actions/Pagination";
import DetailsItem from "./Features/DetailsItem";
import { getData } from "../../../../axiosConfig/API";
import Invoice from "./Features/Invoice";
import MoreDetails from "./Features/MoreDetails";

export default function Pos() {
  const pagination_length = 10;
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState({ filter: "" });
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const [cartItem, setCartItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [moreDetailsData, setMoreDetailsData] = useState(null);
  const [modalMoreDetailsVisible, setModalMoreDetailsVisible] = useState(false);

  const fetchMenuItem = useCallback(async () => {
    try {
      const result = await getData("menu");
      sessionStorage.removeItem("origin_data");
      sessionStorage.setItem("origin_meals", JSON.stringify(result.meals));
      setMeals(result.meals);
      setTotalPages(Math.ceil(result.meals.length / pagination_length));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      setCategories(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const indexOfLastItem = currentPage * pagination_length;
  const indexOfFirstItem = indexOfLastItem - pagination_length;
  const currentItems = meals.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchCategories();
    fetchMenuItem();
  }, [fetchCategories, fetchMenuItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputSearch = () => {
    const originMeals =
      JSON.parse(sessionStorage.getItem("origin_meals")) || [];

    const filtered = originMeals.filter((item) =>
      item.name.includes(inputSearch.filter)
    );

    setMeals(filtered);
  };

  const handleInputReset = () => {
    const originMeals =
      JSON.parse(sessionStorage.getItem("origin_meals")) || [];
    setInputSearch({ filter: "" });
    setMeals(originMeals);
  };

  const handleFilterCategories = (id) => {
    const currentItem = document.getElementById(`subMenu_${id}`);
    const allItems = document.querySelectorAll(".subMenu .card");
    const originMeals = JSON.parse(sessionStorage.getItem("origin_meals"));

    const isActive = currentItem.classList.contains("current");
    allItems.forEach((card) => card.classList.remove("current"));

    if (isActive) {
      setMeals(originMeals);
    } else {
      currentItem.classList.add("current");
      setMeals(originMeals.filter((item) => item.category_id === id));
      setTotalPages(Math.ceil(meals.length / pagination_length));
    }
  };

  const addToCart = (item) => {
    setCartItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCartItem(null);
    document.body.style.overflow = "visible";
  };

  const handleInvoiceModalToggle = () => {
    setInvoiceVisible(!invoiceVisible);
    document.body.style.overflow = invoiceVisible ? "visible" : "hidden";
  };

  const handleMoreDetailsToggle = (item) => {
    setMoreDetailsData(!modalMoreDetailsVisible ? item : null);
    setModalMoreDetailsVisible(!modalMoreDetailsVisible);
    document.body.style.overflow = modalMoreDetailsVisible
      ? "visible"
      : "hidden";
  };

  const handleToggleClass = () => {
    const parent = document.getElementById("posCartItems");
    const menuItem = document.querySelector(".posMenuItem");

    if (parent) {
      const currentOverflow = window.getComputedStyle(document.body).overflow;

      if (currentOverflow === "visible" || currentOverflow === "") {
        parent.classList.add("show");
        if (menuItem) menuItem.classList.add("layout");
        document.body.style.overflow = "hidden";
      } else {
        parent.classList.remove("show");
        if (menuItem) menuItem.classList.remove("layout");
        document.body.style.overflow = "visible";
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        const parent = document.getElementById("posCartItems");
        const menuItem = document.querySelector(".posMenuItem");

        if (parent) parent.classList.remove("show");
        if (menuItem) menuItem.classList.remove("layout");

        document.body.style.overflow = "visible";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Pos">
      <div className="posMenuItem">
        <div className="posSearch">
          <div className="input-group mb-3">
            <input
              type="filter"
              name="filter"
              id="filter"
              className="form-control"
              placeholder="search by name"
              value={inputSearch.filter}
              onChange={(e) => handleChange(e)}
            />

            <button
              className="btn btn-outline-secondary iconSearch"
              type="button"
              onClick={() => handleInputSearch()}
            >
              <IoIosSearch />
            </button>
            {inputSearch.filter !== "" && (
              <button
                className="btn btn-danger iconReset"
                type="button"
                onClick={() => handleInputReset()}
              >
                <FaXmark />
              </button>
            )}
          </div>
        </div>

        <div className="posContent">
          {Object(categories).length > 0 && (
            <div className="subMenu mb-3">
              <div className="cards">
                {categories.map((item, index) => (
                  <div
                    className="card"
                    key={index}
                    id={`subMenu_${item.id}`}
                    onClick={() => handleFilterCategories(item.id)}
                  >
                    <img
                      loading="lazy"
                      src={`http://localhost:8000/storage/${item.image}`}
                      alt={item.name}
                    />
                    <small className="card-name">{item.name}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Object(meals).length > 0 ? (
            <div className="mainMenu">
              <div className="cards">
                {currentItems.map((item) => (
                  <div
                    className="card"
                    key={item.id}
                    id={`mainMenu_${item.id}`}
                  >
                    <div className="card-img">
                      <img
                        src={`http://localhost:8000/storage/${item.image}`}
                        alt={item.name}
                      />
                    </div>
                    <div className="card-body p-2">
                      <p className="fw-bold pb-2">{item.name}</p>
                      <div>
                        {item.meal_size_costs &&
                        item.meal_size_costs.length > 0 ? (
                          <>
                            <span className="fw-bold itemPrice">
                              ${item.meal_size_costs[0].cost}
                            </span>
                            <button
                              className="addCartBtn"
                              onClick={() => addToCart(item)}
                            >
                              <FaShoppingBag /> add
                            </button>
                          </>
                        ) : (
                          <p className="price_not_available">
                            Price not available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {Object(meals).length > 10 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          ) : (
            <p>There are no items in this category.</p>
          )}
        </div>

        <button
          className="btn btn-primary openPosCartItems"
          onClick={handleToggleClass}
        >
          <AiFillShopping />
          <span className="fs-6 fw-bold">Total Cost - </span>
          <span className="fs-6 fw-bold">${cartItemTotal.toFixed(2)}</span>
        </button>
      </div>

      <CartItems
        toggleCart={handleToggleClass}
        modalClose={handleInvoiceModalToggle}
        total={setCartItemTotal}
        detailsItemToggle={handleMoreDetailsToggle}
      />

      {modalVisible && (
        <DetailsItem
          visible={modalVisible}
          cartItem={cartItem}
          modalClose={handleModalClose}
        />
      )}

      {invoiceVisible && (
        <Invoice
          visible={invoiceVisible}
          modalClose={handleInvoiceModalToggle}
        />
      )}

      {modalMoreDetailsVisible && (
        <MoreDetails
          visible={modalMoreDetailsVisible}
          data={moreDetailsData}
          modalClose={handleMoreDetailsToggle}
        />
      )}

      <AddCustomer />
    </div>
  );
}
