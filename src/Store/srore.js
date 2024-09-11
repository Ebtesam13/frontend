import { createStore } from "redux";
import cartReducer from "./reducer";


const newStore=createStore(cartReducer)

export default newStore;



