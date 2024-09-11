import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import { increaseItemQuant, decreaseItemQuant } from "../../Store/action";

export default function FullCart() {
  const cart = useSelector((state) => state.cartItems);
  const cartTotal = useSelector((state) => state.cartTotal);

  const dispatcher = useDispatch();

  function increaseItems(item) {
    console.log(item);
    dispatcher(increaseItemQuant(item));
    // dispatcher(changeCartTotal(item.cost))
  }
  function decreaseItems(item) {
    console.log(item);

    dispatcher(decreaseItemQuant(item));
    // dispatcher(changeCartTotal(-item.cost))
  }
  return (
    <>
      <div className="h-[calc(100svh-200px)] lg:h-[calc(100svh-220px)] thin-scrolling overflow-y-auto p-4 relative">
        {cart.map((item, index) => (
          <CartCard
            key={index}
            src={item.image}
            // src={`${typeof item.image!=="undefined"?item.image:''}`}

            title={`${typeof item.size !== "undefined" ? item.size : ""} ${
              item.name
            }`}
            // description={item.description}
            price={item.cost}
            quant={item.quant}
            increase={() => increaseItems(item)}
            decrease={() => decreaseItems(item)}
          />
        ))}
      </div>
    </>
  );
}
