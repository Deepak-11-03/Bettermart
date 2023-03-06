import {
  Box,
  Card,
  Paper,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  Rating,
  TextField,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React, { useState } from "react";

import style from "../../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import Cookies from "js-cookie";
import Error from "../_error";

export default function detailsPage({
  user,
  product,
  cartItems,
  setCartItems,
}) {
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [adding, setAdding] = useState(false);
  const [pincode, setPincode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();
  const { loading, cart } = useSelector((state) => state.cart);
  // const{totalItems,setTotalItems} = useContext(ContextApi)

  const addProduct = (product) => {
    console.log(cart);
    if (!Cookies.get("token")) {
      setAlert(true);
    }
    // else if(product.quantity === 10){
    //     setAlert(true)
    //     setMsg("MAximum qauntity to buy is 10")
    // }
    else {
      dispatch(addToCart(product._id));
      setMsg("Product added to your cart");
      setSuccess(true);
    }
  };

  const alertClose = () => {
    setAlert(false);
    setSuccess(false);
  };

  const checkPincode = async (pincode) => {
    let api = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    api = await api.json();
    console.log(api[0].Status);
    if (api[0].Status === "Success") {
      setInvalid(false);
    }
    if (api[0].Status === "Error") {
      setInvalid(true);
    }
  };

  if (product.status === false) {
    return <Error />;
  }

  return (
    <div className={style.main}>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      <Snackbar
        sx={{ width: "16rem" }}
        open={alert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert
          onClose={alertClose}
          variant="filled"
          severity="info"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{ width: "23rem" }}
        open={success}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert
          onClose={alertClose}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Grid
        container
        sx={{ padding: "15px", height: "100%" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <Paper elevation={3}>
            <CardMedia
              sx={{
                height: "400px",
                width: "100%",
                objectFit: "contain",
                margin: "auto",
              }}
              component="img"
              image={image || product.thumbnail}
              alt="Paella dish"
            />
          </Paper>
          <ImageList
            sx={{
              width: "100%",
              height: 100,
              margin: "auto",
              marginTop: "15px",
            }}
            cols={6}
            gap={10}
          >
            {product.images.map((item) => (
              <ImageListItem
                key={item}
                sx={{
                  objectFit: "contain",
                  overflow: "hidden",
                  border: "1px solid",
                  cursor: "pointer",
                }}
                onClick={() => setImage(item)}
              >
                <img
                  src={`${item}?w=120&h=100&fit=crop&auto=format`}
                  srcSet={`${item}?w=120&h=100&fit=crop&auto=format&dpr=2 2x`}
                  alt={item}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid
          item
          lg={7}
          md={7}
          sm={7}
          xs={12}
          sx={{ justifyContent: "center" }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Typography variant="caption" color="blue">
              {product.brand}
            </Typography>
            <Typography variant="h5" color="initial">
              {product.title}
              <br />
              <Rating
                name="Rating"
                value={Number(product.rating)}
                size="small"
                readOnly
              />
            </Typography>

            <Typography variant="h5" color="initial">
              {product.description}
            </Typography>
            <Typography>
              <s>&#8377;{product.price}</s> &nbsp;
              <span style={{ color: "green" }}>
                {product.discountPercentage}% Discount
              </span>
            </Typography>
            <Typography variant="h5">
              <CurrencyRupeeIcon sx={{ fontSize: "1.3rem" }} />
              {Math.abs(
                product.price - product.price / product.discountPercentage
              ).toFixed(0)}
            </Typography>
            <Paper elevation={0}>
              <TextField
                type="number"
                label="Pincode"
                variant="standard"
                size="small"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                error={invalid}
                helperText={invalid && "Enter valid pincode"}
              />
              <Button
                sx={{ marginTop: "10px" }}
                onClick={() => checkPincode(pincode)}
              >
                Check
              </Button>
            </Paper>
            {adding ? (
              <Button
                disabled
                variant="contained"
                startIcon={<ShoppingCartOutlinedIcon />}
              >
                Adding Product ..
              </Button>
            ) : (
              <Button
                variant="contained"
                className={style.button}
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={() => {
                  addProduct(product);
                }}
              >
                {" "}
                Add to Cart
              </Button>
            )}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export async function getServerSideProps({ params: { title } }) {
  const res = await fetch(`https://celebrated-buttercream-e25c95.netlify.app/api/products/${title}`, {
    method: "GET",
  });
  const product = await res.json();
  return {
    props: { product },
  };
}
