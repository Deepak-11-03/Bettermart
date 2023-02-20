import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    CLEAR_ERRORS,
  } from "../constants/productConstant";


export const productReducer =(state ={products:[]},action)=>{
    switch (action.type) {
        case PRODUCT_REQUEST:
            return{
            loading:true,
            products:[]
        }
        case PRODUCT_SUCCESS:
            return{
            loading:false,
            products:action.payload.products
        }
        case PRODUCT_FAIL:
            return{
            loading:false,
            products:action.payload
        }
        case CLEAR_ERRORS:
            return{
           ...state,
            error:null
        }
        default:
            return state;
    }
}