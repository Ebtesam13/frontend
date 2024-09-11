import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function QuantityInput({ quantityValue, onQuantityChange }) {
  const [quantity, setQuantity] = useState(quantityValue);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity]);

  const plusQuantityItem = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const minusQuantityItem = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      <AiOutlinePlusCircle onClick={plusQuantityItem} className="pr-1" />
      <input
        type="number"
        className="quantityInput"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <AiOutlineMinusCircle onClick={minusQuantityItem} className="pl-1" />
    </>
  );
}
