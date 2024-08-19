import React, { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { addData } from "../../../../../axiosConfig/API";

export default function CartItems({
  toggleCart,
  modalClose,
  total,
  detailsItemToggle,
}) {
  const [items, setItems] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalTotalWithDiscount, setFinalTotalWithDiscount] = useState(0);

  useEffect(() => {
    total(finalTotal);

    const loadStoreItems = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
      setItems(cartItems);
      updateFinalTotal(cartItems);

      if (cartItems.length < 1) {
        document.querySelector(".discountType").style.display = "none";
        document.querySelector(".paymentOption").style.display = "none";
      } else {
        document.querySelector(".discountType").style.display = "flex";
        document.querySelector(".paymentOption").style.display = "flex";
      }
    };

    loadStoreItems();
    window.addEventListener("storageUpdated", loadStoreItems);

    return () => {
      window.removeEventListener("storageUpdated", loadStoreItems);
    };
  }, []);

  const applyDiscount = (totalCost) => {
    let discountAmount = 0;

    if (discountType === "percentage") {
      discountAmount = (totalCost * discountValue) / 100;
    } else if (discountType === "fixed") {
      discountAmount = discountValue;
    }

    const newFinalTotalWithDiscount = totalCost - discountAmount;
    setFinalTotalWithDiscount(
      newFinalTotalWithDiscount > 0 ? newFinalTotalWithDiscount : 0
    );
  };

  const updateQuantity = (id, operation) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            sizes: item.sizes.map((size) =>
              size.size === item.sizes[0].size
                ? {
                    ...size,
                    quantity:
                      operation === "increase"
                        ? ++size.quantity
                        : Math.max(size.quantity - 1, 1),
                  }
                : size
            ),
          }
        : item
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setItems(updatedItems);
    updateFinalTotal(updatedItems);
  };

  const updateFinalTotal = (items) => {
    let totalCost = 0;

    if (Object(items).length > 0) {
      items.forEach((item) => {
        if (item.sizes) {
          item.sizes.forEach((size) => {
            totalCost += size.cost * size.quantity;
          });
        }
        if (item.addons) {
          item.addons.forEach((addon) => {
            totalCost += addon.cost * addon.quantity;
          });
        }
        if (item.extras) {
          item.extras.forEach((extra) => {
            totalCost += extra.cost * extra.quantity;
          });
        }
      });
      setFinalTotal(totalCost);
      applyDiscount(totalCost);
      total(totalCost);
    } else {
      setFinalTotal(0);
      applyDiscount(0);
      total(0);
    }
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, place order",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await addData("auth/orders", items);
          console.log("response", response);
          if (response.status === "success") {
            handleResetCart();
            Swal.fire("Saved!", response.message, "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Delete Item",
      text: "Are you sure you want to delete item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete item",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (document.getElementById("Loader")) {
          document.getElementById("Loader").classList.add("show");

          setTimeout(() => {
            document.getElementById("Loader").classList.remove("show");
            removeOneItemFromCart();
          }, 1500);
        } else {
          removeOneItemFromCart();
        }
      }
    });

    const removeOneItemFromCart = () => {
      const updatedItems = items.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      updateFinalTotal(updatedItems);

      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
    };
  };

  const handleResetCart = () => {
    Swal.fire({
      title: "Reset Cart",
      text: "Are you sure you want to reset cart?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, reset cart",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (document.getElementById("Loader")) {
          document.getElementById("Loader").classList.add("show");

          setTimeout(() => {
            document.getElementById("Loader").classList.remove("show");
            resetItemsCart();
          }, 1500);
        } else {
          resetItemsCart();
        }
      }
    });

    const resetItemsCart = () => {
      localStorage.setItem("cartItems", JSON.stringify([]));
      setItems([]);
      updateFinalTotal(localStorage.setItem("cartItems", JSON.stringify([])));
      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
    };
  };

  return (
    <div className="posCartItems" id="posCartItems">
      <div className="CartItems">
        <div className="closePosCartItems" onClick={toggleCart}>
          <FaXmark />
        </div>

        <form>
          <div className="input-group gap-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search customers"
            />
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addPosCustomer"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <RiAddCircleLine />
              add
            </button>
          </div>
        </form>

        <div className="table-responsive mt-3">
          <table className="table text-center tableItems">
            <thead>
              <tr>
                <th>C</th>
                <th>item</th>
                <th>qty</th>
                <th>more</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {Object(items).length > 0 ? (
                items.map((item) => (
                  <tr id={item.id} key={item.id}>
                    <td>
                      <FaTrash
                        className="text-danger"
                        onClick={() => handleDeleteItem(item.id)}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <div className="quantityActions">
                        <AiOutlinePlusCircle
                          onClick={() => updateQuantity(item.id, "increase")}
                        />
                        <input
                          type="number"
                          name="quantity"
                          value={item.sizes[0].quantity}
                          readOnly
                        />
                        <AiOutlineMinusCircle
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className={
                            item.sizes[0].quantity === 1 ? "disabled-icon" : ""
                          }
                        />
                      </div>
                    </td>
                    {item.addons.length > 0 || item.extras.length > 0 ? (
                      <td>
                        <button
                          className="detailsItem"
                          onClick={() => detailsItemToggle(item)}
                        >
                          <i className="fa-regular fa-square-caret-down"></i>
                        </button>
                      </td>
                    ) : (
                      "--"
                    )}
                    <td>
                      $
                      {item.sizes && item.sizes.length > 0
                        ? (item.sizes[0].cost * item.sizes[0].quantity).toFixed(
                            2
                          )
                        : 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-danger" colSpan={5}>
                    no items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="discountType mb-3">
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="number"
            value={discountValue}
            onClick={() => setDiscountValue("")}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
          />
          <button onClick={() => applyDiscount(finalTotal)}>Apply</button>
        </div>

        <ul className="payment-details">
          <li className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">sub total</span>
            <span className="fw-semibold">${finalTotal.toFixed(2)}</span>
          </li>
          <li className="d-flex justify-content-between mb-2">
            <span>discount</span>
            <span>${discountValue === "" ? 0 : discountValue}</span>
          </li>
          <li className="d-flex justify-content-between">
            <span className="fw-bold">total</span>
            <span className="fw-bold">
              $
              {finalTotalWithDiscount === 0
                ? finalTotal.toFixed(2)
                : finalTotalWithDiscount.toFixed(2)}
            </span>
          </li>
        </ul>

        <div className="paymentOption mt-3">
          <button className="btn btn-danger" onClick={handleResetCart}>
            cancel
          </button>
          <button className="btn btn-success" onClick={handleOrder}>
            order
          </button>
        </div>

        {items.length > 0 ? (
          <div className="invoice" onClick={modalClose}>
            invoice
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
