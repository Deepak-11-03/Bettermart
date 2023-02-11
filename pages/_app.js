import { useEffect, useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { Router } from "next/router";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Context from "../utils/context";
import Footer from "../Components/Footer";


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [user, setUser] = useState({ value: null });

  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
   
    const token = Cookies.get("token");
    if (token) {
      setUser({ value: token });
    } else {
      setUser({ value: null });
    }
  }, [router.query]);
 var total;
  const fetchCart = async () => {
      let api = await fetch("http://localhost:3000/api/user/cart", {
        method: "GET",
        headers: {
          authorization: Cookies.get("token"),
        },
      });
      let cart = await api.json();
      setCartItems(cart.cart);
      if(cart.cart && cart.cart.items){
        total = cart.cart.totalItems
        setTotalItems(total)
       }
       
  };


  useEffect(() => {
    if (Cookies.get("token")) {
    fetchCart();
    }
    else{
      setTotalItems(0)
    }
  }, [cartItems && cartItems.totalItems ,user.value]); 



  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <>
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
        <Header user={user} setUser={setUser} cartItems={cartItems}  setCartItems={setCartItems} totalItems={totalItems} setTotalItems={setTotalItems} />
        <Component
          {...pageProps}
          user={user}
          cartItems={cartItems}
          setCartItems={setCartItems}
          totalItems={totalItems}
        />
    </>
  );
}





// const saveCart = (myCart) => {
//   localStorage.setItem("cart", myCart);
// };

// const addtoCart = (id, title, qty, price) => {
//   let newCart = cart;
//   if (id in cart) {
//     newCart[id].qty = cart[id].qty + qty;
//   } else {
//     newCart[id] = { qty: 1, price, title };
//   }
//   setCart(newCart);
//   saveCart(newCart);
//   console.log(cart);
// };

// const clearCart = () => {
//   setCart({});
//   saveCart({});
// };

// const removeFromCart = (id, title, qty, price) => {
//   let newCart = cart;
//   if (id in cart) {
//     newCart[id].qty = cart[id].qty - qty;
//   }
//   if (newCart[id]["qty"] <= 0) {
//     delete newCart[id];
//   }
//   setCart(newCart);
//   saveCart(newCart);
// };