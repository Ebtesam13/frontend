import "./MoreDetails.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MoreDetails({ visible, data, modalClose }) {
  const [addons, setAddons] = useState([]);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    if (data) {
      setAddons(data.addons);
      setExtras(data.extras);
    }
  }, [data]);

  const removeItemById = (itemId, type) => {
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
      const storeItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const updatedItems = storeItems.map((item) => {
        if (item.addons && type === "addons") {
          item.addons = item.addons.filter((addon) => addon.id !== itemId);
          setAddons(item.addons);
        } else if (item.extras && type === "extras") {
          item.extras = item.extras.filter((extra) => extra.id !== itemId);
          setExtras(item.extras);
        }
        return item;
      });

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
    };
  };

  if (!addons || !extras) return null;

  const hasAddonsOrExtras = addons.length > 0 || extras.length > 0;

  return hasAddonsOrExtras ? (
    <div className={`modal-overlay MoreDetails ${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="modal-content">
          {addons.length > 0 && (
            <div className="addons">
              <label htmlFor="addons">Addons</label>
              {addons.map((addon) => (
                <div className="addon" key={addon.id}>
                  <div className="addon-img">
                    <img
                      loading="lazy"
                      src={`http://localhost:8000/storage/${addon.image}`}
                      alt={addon.name}
                    />
                  </div>
                  <div className="addon-text">
                    <p>
                      {addon.name}{" "}
                      <span className="quantity">x {addon.quantity}</span>
                    </p>
                    <p>price: ${addon.cost}</p>
                  </div>
                  <button
                    className="trashAddon"
                    onClick={() => removeItemById(addon.id, "addons")}
                  >
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {extras.length > 0 && (
            <div className="extras">
              <label htmlFor="extras">Extras</label>
              {extras.map((extra) => (
                <div className="extra" key={extra.id}>
                  <div className="extra-img">
                    <img
                      loading="lazy"
                      src={`http://localhost:8000/storage/${extra.image}`}
                      alt={extra.name}
                    />
                  </div>
                  <div className="extra-text">
                    <p>
                      {extra.name}{" "}
                      <span className="quantity">x {extra.quantity}</span>
                    </p>
                    <p>price: ${extra.cost}</p>
                  </div>
                  <button
                    className="trashExtra"
                    onClick={() => removeItemById(extra.id, "extras")}
                  >
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="closeMoreDetails">
            <button
              className="btn btn-primary form-control"
              onClick={modalClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
