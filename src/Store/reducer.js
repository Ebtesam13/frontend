import cloneDeep from "lodash/cloneDeep";

const getCartData = () => {
  let currentCart = localStorage.getItem("cartItems");

  if (!currentCart) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  } else {
    currentCart = JSON.parse(currentCart);
  }

  return currentCart;
};

const getCartTotal = () => {
  let currentTotal = localStorage.getItem("cartTotal");

  if (!currentTotal) {
    localStorage.setItem("cartTotal", JSON.stringify(0));
  } else {
    currentTotal = JSON.parse(currentTotal);
  }

  return Number(currentTotal);
};

const VALUE = {
  cartTotal: getCartTotal(),
  cartItems: getCartData(),
  searchStatement: "",
  itemQuant: 1,
  table_num: null,
  table_id: null,
};
export default function cartReducer(state = VALUE, action) {
  switch (action.type) {
    case "CHG_CART_TOTAL":
      return {
        ...state,
        cartTotal: state.cartTotal + action.payload,
      };

    case "INC_ITEM":
      console.log(action.payload);
      if (action.payload.table_name === "meals") {
        const existingItem = state.cartItems.filter(
          (item) =>
            item.name === action.payload.name &&
            item.size === action.payload.size
        );

        if (existingItem.length !== 0) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.name === action.payload.name &&
              item.size === action.payload.size
                ? { ...item, quant: item.quant + 1 }
                : item
            ),
            cartTotal: Number(
              Number(state.cartTotal + existingItem[0].cost).toFixed(2)
            ),
          };
        }
      } else {
        const existingItem = state.cartItems.find(
          (item) => item.name === action.payload.name
        );
        console.log(existingItem);
        if (existingItem.length !== 0) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.name === action.payload.name
                ? { ...item, quant: item.quant + 1 }
                : item
            ),
            cartTotal: Number(
              Number(state.cartTotal + existingItem.cost).toFixed(2)
            ),
          };
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      return state;

    case "INC_ITEM_B_CART":
      return {
        ...state,

        itemQuant: state.itemQuant + 1,
      };

    case "DEC_ITEM":
      console.log(action.payload);
      if (action.payload.table_name === "meals") {
        const existingItem = state.cartItems.filter(
          (item) =>
            item.name === action.payload.name &&
            item.size === action.payload.size
        );

        if (existingItem.length !== 0) {
          if (existingItem[0].quant === 1) {
            console.log(state.cartItems);
            return {
              ...state,
              cartItems: state.cartItems.filter(
                (item) => item !== existingItem[0]
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem[0].cost).toFixed(2)
              ),
            };
          } else {
            // Decrease the item quantity by 1
            return {
              ...state,
              cartItems: state.cartItems.map((item) =>
                item.name === action.payload.name &&
                item.size === action.payload.size
                  ? { ...item, quant: item.quant - 1 }
                  : item
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem[0].cost).toFixed(2)
              ),
            };
          }
        }
      } else {
        const existingItem = state.cartItems.find(
          (item) => item.name === action.payload.name
        );
        console.log(existingItem);
        if (existingItem.length !== 0) {
          if (existingItem.quant === 1) {
            // Remove the item from the cart if quantity is 1
            return {
              ...state,
              cartItems: state.cartItems.filter(
                (item) => item.name !== action.payload.name
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem.cost).toFixed(2)
              ),
            };
          } else {
            // Decrease the item quantity by 1
            return {
              ...state,
              cartItems: state.cartItems.map((item) =>
                item.name === action.payload.name
                  ? { ...item, quant: item.quant - 1 }
                  : item
              ),
              cartTotal: Number(
                (state.cartTotal - existingItem.cost).toFixed(2)
              ),
            };
          }
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      // Default return if no changes were made
      return state;

    case "DEC_ITEM_B_CART":
      if (state.itemQuant > 1) {
        return {
          ...state,
          itemQuant: state.itemQuant - 1,
        };
      }

    case "ZERO_QUANT":
      return {
        ...state,
        itemQuant: 1,
      };

    case "ADD_TO_CART":
      let payload = cloneDeep(action.payload);

      if (payload[0].table_name === "meals") {
        console.log(payload[0].table_name);
        let sizeEx = state.cartItems.filter(
          (item) => item.size === payload[0].size
        );
        if (sizeEx.length !== 0) {
          let nameEx = sizeEx.filter((item) => item.name === payload[0].name);
          if (nameEx.length !== 0) {
            state.cartItems.find((item) => item === nameEx[0]).quant +=
              payload[1];
            state.cartTotal = Number(
              Number(state.cartTotal + nameEx[0].cost * payload[1]).toFixed(2)
            );
          } else {
            payload[0].quant = payload[1];
            state.cartItems.push(payload[0]);
            state.cartTotal = Number(
              Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
            );
          }
        } else {
          payload[0].quant = payload[1];
          state.cartItems.push(payload[0]);
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        }
      } else {
        let nameEx = state.cartItems.filter(
          (item) => item.name === payload[0].name
        );
        if (nameEx.length !== 0) {
          state.cartItems.find((item) => item.name === payload[0].name).quant +=
            payload[0].quant;
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        } else {
          payload[0].quant = payload[1];
          state.cartItems.push(payload[0]);
          state.cartTotal = Number(
            Number(state.cartTotal + payload[0].cost * payload[1]).toFixed(2)
          );
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      return {
        ...state,
        cartItems: state.cartItems,
      };

    case "SEARCH":
      state.searchStatement = action.payload;
      return {
        ...state,
        searchStatement: state.searchStatement,
      };
    case "EMP_CART":
      state.cartItems = [];
      state.cartTotal = 0;
      return {
        ...state,
        cartItems: state.cartItems,
        cartTotal: state.cartTotal,
      };
    case "SET_TABLE":
      state.table_id = action.payload[0];
      state.table_num = action.payload[1];
      return {
        ...state,
        table_id: state.table_id,
        table_num: state.table_num,
      };
    case "UPDATE":
      state.updated = action.payload;
      return {
        ...state,
        updated: state.updated,
      };

    default:
      return state;
  }
}
