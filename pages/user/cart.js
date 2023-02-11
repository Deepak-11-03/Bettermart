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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import React from "react";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

export default function cart({ user, cartItems, totalItems,setCartItems }) {
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));


  const updateitems = async(qty,id)=>{
      let api = await fetch(`http://localhost:3000/api/user/updatecart`,{
        method :"PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":Cookies.get('token')
        },
        body:JSON.stringify({qty,id})
      })
      api= await api.json()
      setCartItems(api.cart.items)
  }



  return (
    <div className={style.main}>
      {user.value ? (
        <Card className={isMatch ? style.cartmid : style.cartFull}>
          <Box
            sx={{
              background: "lightyellow",
              minWidth: "18%",
              backgroundColor: "white",
              minHeight: "50px",
              position: "sticky",
              zIndex: "10",
              top: "0px",
              right: "0px",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="black">
                Subtotal : ({cartItems && totalItems} items) &emsp; Rs {cartItems && cartItems.totalPrice }
              </Typography>
              <Button variant="contained" color="primary"  disabled={!totalItems} onClick={()=>router.push('/user/checkout')} >
                <ShoppingCartCheckoutOutlinedIcon/>  Procced to Buy
              </Button>
            </CardContent>
          </Box>
          <Box sx={{ width: "100%", padding: "10px"}}>
            {/* <h2>items here</h2> */}
            {cartItems && cartItems.items && (
              cartItems.items.map((item, index) => {
                return (
                  <Paper
                    sx={{
                      display: "flex",
                      gap: "10px",
                      margin: "10px",
                      padding: "5px",
                    }}
                    key={index}
                  >
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        padding: "3px",
                      }}
                      src={item.productId.thumbnail}
                      alt="Paella dish"
                    />
                    <Box>
                      <Typography fontSize={12} color="initial">
                        {item.productId.brand}
                      </Typography>
                      <Typography variant="h6" color="initial">
                        {item.productId.title}
                      </Typography>
                      <IconButton onClick={()=>updateitems(item.quantity-1,item.productId._id)}>
                      <RemoveIcon />
                      </IconButton>
                      <span> {item.quantity} </span>
                      <IconButton onClick={()=>updateitems(item.quantity+1,item.productId._id)}>
                        <AddIcon />
                      </IconButton>
                      &emsp;
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={()=>updateitems(0,item.productId._id)}
                      >
                        Remove
                      </Button>
                     </Box>
                  </Paper>
                );
              })
            )}
            {totalItems === 0 && <Typography>Please add items</Typography>}
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

