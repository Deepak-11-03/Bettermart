import { useEffect, useState } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { Router } from "next/router";
import Header from "../Components/Header";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import store from '../redux/store'
import { Provider } from "react-redux";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";




export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();

  const showFooter = router.pathname === '/user/login'  ? false :true

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
       <Header user={user} setDrawer={setDrawer}  />
        <Sidebar drawer={drawer} setDrawer={setDrawer}/>
        <Component
          {...pageProps}
          user={user}
        />
        {showFooter && <Footer/>}
       </Provider>

    </>
  );
}