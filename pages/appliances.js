import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import style from "../styles/Home.module.css";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
export default function appliances({ product }) {
  const router = useRouter();
  function detailed(id) {
    router.push(`/products/${id}`);
  }
  return (
    <div className={style.main}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {product.products.map((post) => {
          return (
            <Grid item xs={12} sm={4} md={4} key={post.id}>
              <Card
                sx={{ minHeight: "48vh", justifyContent: "center" }}
                onClick={() => detailed(post.id)}
              >
                <CardActionArea sx={{ height: "100%" }}>
                  <CardMedia
                    sx={{ objectFit: "contain" }}
                    component="img"
                    height="250px"
                    image={post.thumbnail}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h5" color="initial">
                      {post.title}
                    </Typography>
                    <Typography variant="h5" color="initial">
                      <CurrencyRupeeIcon />
                      {post.price}
                    </Typography>
                    <Typography variant="body" color="initial">
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products/category/lighting");
  const product = await res.json();
  return {
    props: { product },
  };
}
