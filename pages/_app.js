import { useEffect, useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { Router } from "next/router";
import Layout from "../Components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const[cart,setCart]=useState({})
  const[price,setPrice]=useState(0)

  useEffect(()=>{
   try {
    if(localStorage.getItem("cart")){
      setCart(JSON.parse(localStorage.getItem("cart")))
    }
   } catch (error) {
     localStorage.clear()
   }
  },[])

  const saveCart =(myCart)=>{
    localStorage.setItem('cart',myCart)
  }

  const addtoCart =(id,title,qty,price)=>{
    let newCart = cart;
    if(id in cart){
      newCart[id].qty = cart[id].qty+qty
    }
    else{
      newCart[id]={qty:1 , price ,title}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart =()=>{
    setCart({})
    saveCart({})

  }

  const removeFromCart =(id,title,qty,price)=>{
    let newCart = cart;
    if(id in cart){
      newCart[id].qty = cart[id].qty-qty
    }
   if(newCart[id]["qty"] <=0){
      delete newCart[id]
   }
    setCart(newCart)
    saveCart(newCart)
  }

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <>
      <Layout>
        {loading && (
          <Backdrop
            sx={{
              color: "#ffffff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Component {...pageProps} />
      </Layout>
    </>
  );
}
