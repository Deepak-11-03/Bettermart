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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import style from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSelector,useDispatch } from "react-redux";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { updateCart,getCart } from "../../redux/actions/cartAction";
import { useEffect } from "react";

export default function cart({ user }) {
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch() 

  const {cart,loading} = useSelector((state)=>state.cart)
 
  useEffect(()=>{
    dispatch(getCart())
  },[dispatch])

  function update(qty,id){
    dispatch(updateCart(qty,id))
  }
  
  return (
    <div className={style.main}>
    {loading && (
      <Box sx={{width: '100%' }}>
      <LinearProgress />
    </Box>
    )}
      {user ? (
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
                Subtotal : ({cart ? cart.totalItems :0} items) &emsp; Rs {cart ? cart.totalPrice : 0 }
              </Typography>
              <Button variant="contained" className={style.button} disabled={cart && cart.totalItems === 0} onClick={()=>router.push('/cart/checkout')} >
                <ShoppingCartCheckoutOutlinedIcon/>  Procced to Buy
              </Button>
            </CardContent>
          </Box>
          <Box sx={{ width: "100%", padding: "10px"}}>
            {/* <h2>items here</h2> */}
            {cart && cart.items && (
              cart.items.map((item, index) => {
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
                      <IconButton onClick={()=>update(item.quantity-1,item.productId._id)}>
                      <RemoveIcon />
                      </IconButton>
                      <span> {item.quantity} </span>
                      <IconButton onClick={()=>update(item.quantity+1,item.productId._id)}>
                        <AddIcon />
                      </IconButton>
                      &emsp;
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={()=>update(0,item.productId._id)}
                      >
                        Remove
                      </Button>
                     </Box>
                  </Paper>
                );
              })
            )}
            {cart && cart.totalItems === 0 && <Typography>Please add items</Typography>}
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

