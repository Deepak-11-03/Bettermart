import {
  ADD_TO_CART,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  CLEAR_CART,
  USER_CART
} from "../constants/cartContant";

export const cartReducer = (state = { cart: [] ,msg:"" }, action) => {
  switch (action.type) {
    
    case GET_CART_REQUEST:
      return {
        loading: true,
        cart: [],
      };
    case GET_CART_SUCCESS:
      
      return {
        loading: false,
        cart: action.payload.cart,
        msg:action.payload.msg
      };
    case USER_CART:
      return{
        loading:false,
        cart:state
      }
    case ADD_TO_CART:
      return {
        loading: false,
        cart: action.payload.cart,
        msg:action.payload.msg
      };
    case UPDATE_CART_REQUEST:
      return {
        loading: true,
        cart: state,
      };
    case UPDATE_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload.cart,
        msg:action.payload.msg
      };
    case CART_FAIL:
      return {
        loading: false,
        cart: action.payload,
      };
    case CLEAR_CART:
      return{
        loading:false,
        cart:[]
      }
    default:
      return state;
  }
};
