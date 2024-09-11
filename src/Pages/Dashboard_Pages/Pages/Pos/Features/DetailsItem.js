import "./DetailsItem.css";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function DetailsItem({ visible, cartItem, modalClose }) {
  const [mealSize, setMealSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [selectedExtras, setSelectedExtras] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState();

  useEffect(() => {
    if (cartItem) {
      setMealSize(cartItem.meal_size_costs || []);
      setSelectedSize(cartItem.meal_size_costs[0]?.size || null);
    }
  }, [cartItem]);

  const handleSelectItem = (item, type) => {
    const elementId =
      type === "addon" ? `addon_${item.id}` : `extra_${item.id}`;
    const element = document.getElementById(elementId);
    if (element) element.style.border = "2px solid #0B5ED7";

    const finalTotal = document.getElementById("finalTotal");
    finalTotal.classList.add("scalable");
    setTimeout(() => finalTotal.classList.remove("scalable"), 125);

    const updateFunction =
      type === "addon" ? setSelectedAddons : setSelectedExtras;

    updateFunction((prev) => {
      if (!Array.isArray(prev)) prev = [];

      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const qtyAddonsOrExtra = (items, id) => {
    let item = Object(items).length > 0 && items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const updateFinalTotal = useCallback(() => {
    let totalCost = 0;

    if (selectedSize !== 0 && quantity !== 0) {
      totalCost += selectedSize * quantity;
    }

    if (Object(selectedAddons).length > 0) {
      selectedAddons.forEach((addon) => {
        totalCost += addon.cost * addon.quantity;
      });
    }

    if (Object(selectedExtras).length > 0) {
      selectedExtras.forEach((extra) => {
        totalCost += extra.cost * extra.quantity;
      });
    }
    return totalCost.toFixed(2);
  }, [selectedSize, quantity, selectedAddons, selectedExtras]);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "decrement") {
      setQuantity((prevQuantity) =>
        prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
      );
    }

    const finalTotal = document.getElementById("finalTotal");
    finalTotal.classList.add("scalable");
    setTimeout(() => finalTotal.classList.remove("scalable"), 125);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);

    const finalTotal = document.getElementById("finalTotal");
    finalTotal.classList.add("scalable");
    setTimeout(() => finalTotal.classList.remove("scalable"), 125);
  };

  const handleAddToCart = () => {
    const addons = Array.isArray(selectedAddons) ? selectedAddons : [];
    const extras = Array.isArray(selectedExtras) ? selectedExtras : [];
    const storeItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const newItem = {
      id: cartItem.id,
      name: cartItem.name,
      sizes: [
        {
          size: selectedSize,
          cost: mealSize.find((size) => size.size === selectedSize)?.cost || 0,
          quantity,
        },
      ],
      addons: addons.map(({ id, name, cost, image, quantity }) => ({
        id,
        name,
        cost,
        image,
        quantity,
      })),

      extras: extras.map(({ id, name, cost, image, quantity }) => ({
        id,
        name,
        cost,
        image,
        quantity,
      })),
    };

    const finalizeCartUpdate = () => {
      storeItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(storeItems));
      const event = new Event("storageUpdated");
      window.dispatchEvent(event);
      handleModalReset();
      modalClose();
    };

    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");

      setTimeout(() => {
        document.getElementById("Loader").classList.remove("show");
        finalizeCartUpdate();
      }, 1500);
    } else {
      finalizeCartUpdate();
    }
  };

  const handleModalReset = () => {
    setQuantity(1);
    setSelectedSize(1);
    setSelectedAddons(null);
    setSelectedExtras(null);
    setNotes("");
  };

  const convert = (value) => {
    return value === 1
      ? "small"
      : value === 2
      ? "medium"
      : value === 3
      ? "big"
      : value === 4
      ? "family"
      : "none";
  };

  return (
    <div className={`modal-overlay DetailsItem ${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <form className="modal-content">
          <i className="fas fa-xmark xmarkModalClose" onClick={modalClose}></i>
          <div className="modal-body">
            <div className="item">
              <div className="item-img">
                <img
                  loading="lazy"
                  src={`http://localhost:8000/storage/${cartItem.image}`}
                  alt={cartItem.name}
                />
              </div>
              <div className="item-text">
                <b>{cartItem.name}</b>
                <p>{cartItem.description}</p>
                <b>
                  $
                  {mealSize.find((size) => size.size === selectedSize)?.cost ||
                    0}
                </b>
              </div>
            </div>

            <div className="quantity">
              <label>Quantity</label>
              <div>
                <AiOutlinePlusCircle
                  onClick={() => handleQuantityChange("increment")}
                />
                <input type="number" name="quantity" value={quantity} />
                <AiOutlineMinusCircle
                  onClick={() => handleQuantityChange("decrement")}
                  className={quantity === 1 ? "disabled-icon" : ""}
                />
              </div>
            </div>

            <div className="sizes">
              <label>Meal Size Costs</label>
              <div>
                {mealSize.map((size) => (
                  <div key={size.id} className="size">
                    <input
                      type="radio"
                      name="size"
                      id={convert(size.size)}
                      value={size.size}
                      checked={size.size === selectedSize}
                      onChange={() => handleSizeChange(size.size)}
                    />
                    <label htmlFor={convert(size.size)}>
                      {convert(size.size)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {Object(cartItem.addons).length > 0 && (
              <div className="addons">
                <label>Addons</label>
                <div className="length">
                  {cartItem.addons.map(
                    (addon, index) =>
                      index <= 2 && (
                        <div key={addon.id} className="addon">
                          <div
                            className="addon-img"
                            id={`addon_${addon.id}`}
                            onClick={() => handleSelectItem(addon, "addon")}
                          >
                            <img
                              loading="lazy"
                              src={`http://localhost:8000/storage/${addon.image}`}
                              alt={addon.name}
                            />
                            <p className="cost">${addon.cost}</p>
                            {qtyAddonsOrExtra(selectedAddons, addon.id) !==
                            0 ? (
                              <p className="count">
                                x {qtyAddonsOrExtra(selectedAddons, addon.id)}
                              </p>
                            ) : (
                              false
                            )}
                          </div>
                          <div className="addon-text">
                            <p>{addon.name}</p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {Object(cartItem.extras).length > 0 && (
              <div className="extras">
                <label>Extras</label>
                <div className="length">
                  {cartItem.extras.map(
                    (extra, index) =>
                      index <= 2 && (
                        <div key={extra.id} className="extra">
                          <div
                            className="extra-img"
                            id={`extra_${extra.id}`}
                            onClick={() => handleSelectItem(extra, "extra")}
                          >
                            <img
                              loading="lazy"
                              src={`http://localhost:8000/storage/${extra.image}`}
                              alt={extra.name}
                            />
                            <p className="cost">${extra.cost}</p>
                            {qtyAddonsOrExtra(selectedExtras, extra.id) !==
                            0 ? (
                              <p className="count">
                                x {qtyAddonsOrExtra(selectedExtras, extra.id)}
                              </p>
                            ) : (
                              false
                            )}
                          </div>
                          <div className="extra-text">
                            <p>{extra.name}</p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            <div className="notes">
              <label>Notes</label>
              <textarea
                rows="3"
                value={notes}
                className="form-control"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button
              type="button"
              className="btn form-control mt-3 fw-bold"
              onClick={() => handleAddToCart()}
            >
              Add To Cart - <span id="finalTotal"> ${updateFinalTotal()}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
