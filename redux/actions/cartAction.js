import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ADD_TO_CART, GET_CART_REQUEST,
    GET_CART_SUCCESS,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
    REMOVE_FROM_CART,
    CLEAR_CART,CART_FAIL, USER_CART } from "../constants/cartContant";

export const getCart =()=> async(dispatch)=>{

    try {
        dispatch({type:GET_CART_REQUEST})
        let data = await fetch('/api/user/cart',{
            method: "GET",
            headers: {
              authorization: Cookies.get("token"),
            },
        })
        data = await data.json();
        
        dispatch({
            type:GET_CART_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({
            type:CART_FAIL,
            payload:error.response
        })
    }
}

export const addToCart =(id)=>async(dispatch)=>{
  try {
    dispatch({type:UPDATE_CART_REQUEST})
    let data = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":Cookies.get('token')
        },
        body: JSON.stringify(id),
      });
      data = await data.json()
      dispatch({
        type:ADD_TO_CART,
        payload:data
      })
  } catch (error) {
    dispatch({
        type:CART_FAIL,
        payload:error.response
    })
  }
}

export const updateCart =(qty,id)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_CART_REQUEST})
        let data = await fetch(`/api/user/updatecart`,{
        method :"PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":Cookies.get('token')
        },
        body:JSON.stringify({qty,id})
      })
      data= await data.json()
      dispatch({
        type:UPDATE_CART_SUCCESS,
        payload:data
    })        
    } catch (error) {
        dispatch({
            type:CART_FAIL,
            payload:error.response
        })
    }
}