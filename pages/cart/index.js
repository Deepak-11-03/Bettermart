"use Client";
import {
  Box,
  Card,
  CardContent,
  useTheme,
  Paper,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  LinearProgress,
  Snackbar,
  Alert,
  CardHeader,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { updateCart, getCart } from "../../redux/actions/cartAction";
import { useEffect } from "react";
import { USER_CART } from "../../redux/constants/cartContant";
import Cookies from "js-cookie";

export default function cart({ user }) {
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);
  const fetchingCart = () => {
    // localStorage.setItem("cart",JSON.stringify(cart))
    dispatch(getCart());
  };

  function detailed(title) {
    router.push(`/products/${title}`);
  }

  useEffect(() => {
    fetchingCart();
  }, [dispatch]);

  // window.addEventListener('beforeunload', () => {
  //     dispatch(getCart())
  // })

  function update(qty, product) {
    if (product.quantity === 10 && qty >= 10) {
      setMsg("You can buy maximum 10 quantity");
      setAlert(true);
    } else {
      dispatch(updateCart(qty, product.productId._id));
      setMsg("Cart product updated");
      setSuccess(true);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const alertClose = () => {
    setAlert(false);
    setSuccess(false);
  };

  return (
    <div className={style.main}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Snackbar
        open={success || alert}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert
          onClose={alertClose}
          variant="filled"
          severity={(alert && "info") || "success"}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      {user ? (
        <Card className={isMatch ? style.cartmid : style.cartFull}>
          <Box
            sx={{
              padding: "6px",
              margin: "5px",
              background: "lightyellow",
              minWidth: "16rem",
              backgroundColor: "white",
              maxHeight: "10rem",
              position: "sticky",
              zIndex: "10",
              top: "0px",
              right: "0px",
            }}
          >
            <Typography variant="h5" color="initial">
              Order Summery
            </Typography>
            <CardContent sx={{ border: ".5px solid #dee2e6" }}>
              <Typography variant="subtitle2" color="black">
                Total Items : {cart ? cart.totalItems : 0}
              </Typography>
              {/* <br /> */}
              <Typography variant="subtitle2" color="black">
                Total Price : Rs {cart ? cart.totalPrice : 0}
              </Typography>
              <Button
                sx={{ marginTop: "8px" }}
                variant="contained"
                className={style.button}
                disabled={cart && cart.totalItems === 0}
                onClick={() => router.push("/cart/checkout")}
              >
                <ShoppingCartCheckoutOutlinedIcon /> Procced to Buy
              </Button>
            </CardContent>
          </Box>
          <Box sx={{ width: "100%", padding: "10px" }}>
            {/* <h2>items here</h2> */}
            {cart &&
              cart.items &&
              cart.items.map((item, index) => {
                return (
                  <Paper
                    sx={{
                      display: "flex",
                      gap: "10px",
                      margin: "8px",
                      padding: "8px",
                      border: ".5px solid #dee2e6",
                    }}
                    key={index}
                  >
                    <img
                      style={{
                        width: "130px",
                        height: "150px",
                        padding: "3px",
                        cursor: "pointer",
                      }}
                      src={item.productId.thumbnail}
                      alt="Paella dish"
                      onClick={() => detailed(item.productId.title)}
                    />
                    <Box>
                      <Typography fontSize={12} color="initial">
                        {item.productId.brand}
                      </Typography>
                      <Typography noWrap={true} variant="h6" color="initial">
                        {item.productId.title}
                      </Typography>
                      <br />
                      <Typography fontWeight="bolder">
                        Price : Rs {item.productId.price}
                      </Typography>
                      <br />
                      <IconButton
                        onClick={() => update(item.quantity - 1, item)}
                      >
                        <RemoveIcon
                          sx={{ border: "1px solid", borderRadius: "50%" }}
                        />
                      </IconButton>
                      <span> {item.quantity} </span>
                      <IconButton
                        onClick={() => update(item.quantity + 1, item)}
                      >
                        <AddIcon
                          sx={{ border: "1px solid", borderRadius: "50%" }}
                        />
                      </IconButton>
                      &emsp;
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => update(0, item)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Paper>
                );
              })}
            {cart && cart.totalItems === 0 && (
              <Typography textAlign="center" variant="h4">
                Please add items
              </Typography>
            )}
          </Box>
        </Card>
      ) : (
        <Box
          sx={{
            width: 300,
            height: 300,
            margin: "auto",
            marginTop: "8rem",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Please login</Typography>
          <Typography variant="h4">To see your cart</Typography>
        </Box>
      )}
    </div>
  );
}
