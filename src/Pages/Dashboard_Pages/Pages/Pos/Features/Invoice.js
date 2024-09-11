import "./Invoice.css";
import React, { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";

export default function Invoice({ visible, modalClose }) {
  const [invoiceItem, setInvoiceItem] = useState(false);
  const [cartItemTotal, setCartItemTotal] = useState(false);

  useEffect(() => {
    const storeCartItem = JSON.parse(localStorage.getItem("cartItems") || []);
    setInvoiceItem(storeCartItem);

    let totalCost = 0;

    storeCartItem.forEach((item) => {
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

    setCartItemTotal(totalCost.toFixed(2));
  }, []);

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
    <div className={`modal-overlay invoice ${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="options">
            <button className="btn btn-danger" onClick={modalClose}>
              cancel
            </button>
            <button className="btn btn-success" onClick={() => window.print()}>
              <PrinterOutlined />
              print invoice
            </button>
          </div>

          <div className="message-qrCode">
            <div>resta</div> - restaurant menu maker and contactless menu
            ordering system
          </div>

          <div className="restaurant-address">
            <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
            <p>tel: {"+4545344545"}</p>
          </div>

          <div className="id_date">
            <p>
              <span>order id</span>
              <span>{"#48448646"}</span>
            </p>
            <p>
              <span>{"02/05/2024"}</span>
              <span>{"11:54 pm"}</span>
            </p>
          </div>

          <div className="menu">
            <table>
              <thead>
                <tr>
                  <th key="0">qty</th>
                  <th key="1">item description</th>
                  <th key="2">price</th>
                </tr>
              </thead>

              {invoiceItem ? (
                invoiceItem.map((item, index) => (
                  <>
                    <tbody className="item" key={index}>
                      <tr>
                        <td>x {item.sizes[0].quantity}</td>
                        <td>
                          <span>{item.name}</span>
                          <span>size: {convert(item.sizes[0].size)}</span>
                        </td>
                        <td>${item.sizes[0].cost * item.sizes[0].quantity}</td>
                      </tr>

                      {Object(item.addons).length > 0
                        ? item.addons.map((addon, index) => (
                            <tr className="addons" key={index}>
                              <td>x {addon.quantity}</td>
                              {index < 1 ? (
                                <td>addon: {addon.name}</td>
                              ) : (
                                <td>~~~~ : {addon.name}</td>
                              )}
                              <td>${addon.cost}</td>
                            </tr>
                          ))
                        : false}

                      {Object(item.extras).length > 0
                        ? item.extras.map((extra, index) => (
                            <tr className="extras" key={index}>
                              <td>x {extra.quantity}</td>
                              {index < 1 ? (
                                <td>extra: {extra.name}</td>
                              ) : (
                                <td>~~~ : {extra.name}</td>
                              )}
                              <td>${extra.cost}</td>
                            </tr>
                          ))
                        : false}
                    </tbody>
                  </>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <div className="total">
            <div className="row">
              <div className="col">SUBTOTAL</div>
              <div className="col">${cartItemTotal}</div>
            </div>

            <div className="row">
              <div className="col">TOTAL TAX</div>
              <div className="col">${"0.00"}</div>
            </div>

            <div className="row">
              <div className="col">DISCOUNT</div>
              <div className="col">{"0"}</div>
            </div>

            <div className="row fw-bold">
              <div className="col">TOTAL</div>
              <div className="col">${cartItemTotal}</div>
            </div>
          </div>

          <div className="payment">payment type cash</div>

          <div className="messageThank">
            <p>thank you</p>
            <p>please come again</p>
          </div>

          <div className="powered_by">
            <label>powered_by</label>
            <div>resta</div> - restaurant menu maker and contactless menu
            ordering system
          </div>
        </div>
      </div>
    </div>
  );
}
