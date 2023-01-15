import {
  Box,
  Card,
  Paper,
  Stack,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  Rating, ButtonGroup, Button,
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import React, { useState } from "react";

import style from "../../styles/Home.module.css";

export default function detailsPage({ product }) {
  const [image, setImage] = useState("");

  console.log(product.images[0]);
  return (
    <div className={style.main}>
      <Grid
        container
        // md={10}
        // sm={10}
        // xs={10}
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
              image={image || product.images[0]}
              alt="Paella dish"
            />
          </Paper>
          <ImageList
            sx={{ width: "100%", height: 100, marginTop: "15px" }}
            cols={5}
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
          <Container sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"10px"}}>
            <Typography variant="caption" color="blue">
              {product.brand}
            </Typography>
            <Typography variant="h5" color="initial">
              {product.title}
                <br/>
                <Rating name="Rating" value={product.rating} size="small" readOnly/>
            </Typography>
            
            <Typography variant="h5" color="initial">
              {product.description}
            </Typography>
            <Typography >
            <s>&#8377;{product.price}</s> &nbsp;
                <span style={{color:"green"}}>{product.discountPercentage}% Discount</span>
            </Typography>
            <Typography variant="h5">
            <CurrencyRupeeIcon sx={{fontSize: "1.3rem"}}/>{Math.abs(product.price-(product.price/product.discountPercentage)).toFixed(0)}
            </Typography>
            
              <Button  variant="contained" startIcon={<ShoppingCartOutlinedIcon/>}> Add to Cart</Button>
        
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();
  return {
    props: { product },
  };
}
