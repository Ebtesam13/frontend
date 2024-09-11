export const changeCartTotal=(payload)=>{
    return{
        type:"CHG_CART_TOTAL",
        payload:payload
    }
}

export const increaseItemQuant=(payload)=>{
    return{
        type:"INC_ITEM",
        payload:payload
    }
}

export const increaseItemBCart=(payload)=>{
  return{
      type:"INC_ITEM_B_CART",
      payload:payload
  }
}

export const decreaseItemBCart=(payload)=>{
  return{
      type:"DEC_ITEM_B_CART",
      payload:payload
  }
}

export const zeroQuant=()=>{
  return{
      type:"ZERO_QUANT",
      
  }
}
export const decreaseItemQuant=(payload)=>{
    return{
        type:"DEC_ITEM",
        payload:payload
    }
}

export const addToCart = (pokemon) => {
  return {
    type: 'ADD_TO_CART',
    payload: pokemon
  };
};
export const updateAfterRefresh = (payload) => {
  return {
    type: 'UPDATE',
    payload: payload
  };
};

export const search = (payload) => {
    return {
      type: 'SEARCH',
      payload: payload
    };
  };
  export const emptyCart = (payload) => {
    return {
      type: 'EMP_CART',
      payload: payload
    };
  };

  export const setTable = (payload) => {
    return {
      type: 'SET_TABLE',
      payload: payload
    };
  };
//NEW
  export const update = (payload) => {
    return {
      type: 'UPDATE',
      payload: payload
    };
  };
