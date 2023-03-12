import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import style from '../../../styles/Home.module.css';
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import {
  Card,
  Paper,
  Chip,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Error from "../../_error";
import Head from "next/head";
import { useState } from "react";

export default function Beauty({ data }) {
  const router = useRouter();
  function detailed(title) {
    router.push(`/products/${title}`);
  }

  const { category } = router.query;
  if(data.status === false){
    return (
      <Error/>
    )
  }


  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <div className={style.main}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ padding: "15px" }}
      >
        {data.products.map((post) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={post._id} className={style.products} >
              <Paper>
                <Card
                  sx={{ height: "40vh", justifyContent: "center" }}
                  onClick={() => detailed(post.title)}
                >
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardMedia
                      sx={{ objectFit: "contain", width:"100%" }}
                      component="img"
                      height="150px"
                     
                      image={post.thumbnail}
                      alt={post.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" color="initial" noWrap={true}>
                        {post.title}
                      </Typography>
                      <Typography variant="h5" color="initial">
                        <CurrencyRupeeIcon />
                        {Math.abs(
                          post.price - post.price / post.discountPercentage
                        ).toFixed(0)}
                      </Typography>
                      <Chip label="Free Delivery" size="small" />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
    </>
  );
}
export async function getServerSideProps({ params: { category } }) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products/category/${category}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
