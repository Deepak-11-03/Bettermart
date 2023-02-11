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

export default function Beauty({ product }) {
  const router = useRouter();
  function detailed(id) {
    console.log(id);
    router.push(`/products/${id}`);
  }

  return (
    <div className={style.main}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ padding: "15px" }}
      >
        {product.map((post) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={post._id}>
              <Paper>
                <Card
                  sx={{ height: "40vh", justifyContent: "center" }}
                  onClick={() => detailed(post._id)}
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
  );
}
export async function getServerSideProps({ params: { category } }) {
  const res = await fetch(
    `http://localhost:3000/api/products/category/${category}`
  );
  const product = await res.json();
  return {
    props: { product },
  };
}
