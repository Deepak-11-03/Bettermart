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
import Head from "next/head";
import {CustomButton} from '../../utils/customButton'

export default function cart({ user }) {
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);
  const fetchingCart = () => {
    dispatch(getCart());
  };

  function detailed(title) {
    router.push(`/products/${title}`);
  }

  useEffect(() => {
    fetchingCart();
  }, [dispatch]);

  function update(qty, product) {
    if (product.quantity === 10 && qty >= 10) {
      setMsg("You can buy maximum 10 quantity");
      setAlert(true);
    } else {
      dispatch(updateCart(qty, product.productId._id));
      setMsg("Cart product updated");
      setSuccess(true);
    }
    // localStorage.setItem("cart", JSON.stringify(cart));
  }
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const alertClose = () => {
    setAlert(false);
    setSuccess(false);
  };

  return (
  <>
    <Head>
      <title>Cart</title>
    </Head>
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
          className={style.ordersummery}
          >
            <Typography variant="h5" color="initial">
              Order Summery
            </Typography>
            <CardContent sx={{ border: ".5px solid #dee2e6" }}>
              <Typography variant="h5" color="black">
                Total Items : {cart ? cart.totalItems : 0}
              </Typography>
              {/* <br /> */}
              <Typography variant="h5" color="black">
                Total Price : Rs {cart ? cart.totalPrice : 0}
              </Typography>
              <br />
              <CustomButton
                disabled={cart && cart.totalItems === 0 || !cart}
                variant="contained"
                onClick={() => router.push("/cart/checkout")}
              >
                <ShoppingCartCheckoutOutlinedIcon /> Procced to Buy
              </CustomButton>
            </CardContent>
          </Box>
          <Box sx={{ width: "100%", padding: "10px" }}>
            {/* <h2>items here</h2> */}
            {cart &&
              cart.items &&
              cart.items.map((item, index) => {
                return (
                  <Paper
                  className={style.cartItem} 
                    key={index}
                  >
                    <img
                      style={{
                        width: "140px",
                        height: "130px",
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
                      <Typography  variant="h6" color="initial">
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
            {cart && cart.totalItems === 0  && (
              <Typography textAlign="center" variant="h4">
                Please add items
              </Typography>
            )}
          </Box>
        </Card>
      ) : (
        <Box
        className={style.cartWithoutLogin}
        >
          <Typography variant="h4">Please login</Typography>
          <Typography variant="h4">To see your cart</Typography>
        </Box>
      )}
    </div>
  </>
  );
}
