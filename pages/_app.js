import { useEffect, useState } from "react";
import { CircularProgress, Backdrop, Button } from "@mui/material";
import { Router } from "next/router";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import store from '../redux/store'
import { Provider } from "react-redux";
import Footer from "../Components/Footer";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const router = useRouter();

  const showFooter = router.pathname === '/user/login' ? false :true

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [router.query]);


  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    < >
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

      <Provider store={store}>
       <Header user={user}  />
        <Component
          {...pageProps}
          user={user}
        />
        {showFooter && <Footer/>}
       </Provider>

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