import React from 'react';
import { useSelector } from 'react-redux';
import './Cart.css';

const Cart = () => {
  const cart = useSelector(state => state.cartItems);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image_url} alt={item.pokemon} />
              <div className="cart-details">
                <h5>{item.pokemon}</h5>
                <p>Price: OMR {item.hitpoints}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
