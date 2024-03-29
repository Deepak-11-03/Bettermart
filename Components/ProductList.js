import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Paper, Typography } from '@mui/material'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from 'react'
import style from '../styles/Home.module.css';
import { useRouter } from 'next/router';

function ProductList({data}) {
    const router = useRouter();
    function detailed(title) {
      router.push(`/products/${title}`);
    }
  return (
    <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{padding:"10px 25px 20px 10px"}}
        >
         {data.products.map((product) => {
          return(
          <Grid  item xs={6} sm={3} md={2} key={product._id}  className={style.products} >
          <Paper >
          {/* sx={{height:"40vh",justifyContent:"center"}} */}
            <Card id={style.item} onClick={()=>detailed(product.title)} >
              <CardActionArea sx={{height:"100%"}}>
                <CardMedia sx={{objectFit:"contain",height:"8rem"}} component="img"
           image={product.thumbnail} alt={product.title}/>
          <CardContent sx={{padding:"15px 0 0 8px"}}>
          
            <Typography variant="subtitle1" color="initial" noWrap={true}>{product.title}</Typography>
            <Typography variant="h5" color="initial"><CurrencyRupeeIcon/>{Math.abs(product.price-(product.price/product.discountPercentage)).toFixed(0)}</Typography>          
            <Chip label="Free Delivery" size="small" />
          </CardContent>
          
              </CardActionArea>
            </Card>
            </Paper>
          </Grid>
        )})}
        </Grid>
  )
}

export default ProductList

    {/* <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{padding:"10px 25px 20px 10px"}}
        >
         {data.products.map((product) => {
          return(
          <Grid  item xs={6} sm={3} md={2} key={product._id}  className={style.products} >
          <Paper >
            <Card sx={{height:"40vh",justifyContent:"center"}} onClick={()=>detailed(product.title)} >
              <CardActionArea sx={{height:"100%"}}>
                <CardMedia sx={{objectFit:"contain",height:"8rem"}} component="img"
           image={product.thumbnail} alt={product.title}/>
          <CardContent sx={{padding:"15px 0 0 8px"}}>
          
            <Typography variant="subtitle1" color="initial" noWrap={true}>{product.title}</Typography>
            <Typography variant="h5" color="initial"><CurrencyRupeeIcon/>{Math.abs(product.price-(product.price/product.discountPercentage)).toFixed(0)}</Typography>          
            <Chip label="Free Delivery" size="small" />
          </CardContent>
          
              </CardActionArea>
            </Card>
            </Paper>
          </Grid>
        )})}
        </Grid> */}