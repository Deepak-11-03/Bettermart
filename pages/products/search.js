import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/Home.module.css";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function search() {
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();
  let { query } = router.query;

  function detailed(title) {
    router.push(`/products/${title}`);
  }
  useEffect(() => {
    console.log(query);
    const dataFetch = async () => {
      let api = await fetch(`/api/products/search?q=${query}`);
      api = await api.json();
      setSearchData(api.products);
    };
    dataFetch();
  }, [router.query]);

  return (
    <div className={style.main}>
      {searchData.length === 0 ? (
        <Box sx={{ height: "50vh", paddingTop: "15rem", textAlign: "center" }}>
          <Typography variant="h4" color="initial">
            No product found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: "15px" }}>
          {searchData.map((product) => {
            return (
              <Grid  item xs={6} sm={4} md={3} key={product._id}  className={style.products} >
          <Paper>
            <Card sx={{height:"40vh",justifyContent:"center"}} onClick={()=>detailed(product.title)} >
              <CardActionArea sx={{height:"100%"}}>
                <CardMedia sx={{objectFit:"contain",height:"8rem"}} component="img"
           image={product.thumbnail} alt={product.title}/>
          <CardContent>
          
            <Typography variant="subtitle1" color="initial" noWrap={true}>{product.title}</Typography>
            <Typography variant="h5" color="initial"><CurrencyRupeeIcon/>{Math.abs(product.price-(product.price/product.discountPercentage)).toFixed(0)}</Typography>          
            <Chip label="Free Delivery" size="small" />
          </CardContent>
          
              </CardActionArea>
            </Card>
            </Paper>
          </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default search;
