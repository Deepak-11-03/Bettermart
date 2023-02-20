import {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });
    let data = await fetch("/api/products");
    data = await data.json();
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
