import { combineReducers } from "@reduxjs/toolkit";
import handleCart from "/src/redux/action/reducer/handleCart.js";

const rootReducers = combineReducers({
  handleCart,
});
export default rootReducers;
