import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import style from "../../styles/Home.module.css";

// {
//   shippingDetails: { address: [Object], name: 'Deepak kumar', phone: 9050155506 },
//   items: [ [Object] ],
//   totalPrice: 41,
//   totalItems: 1,
//   cancellable: true,
//   status: 'pending',
//   orderedAt: '31/3/2023, 2:32:36 pm',
//   createdAt: '2023-03-31T09:02:36.600Z',
//   updatedAt: '2023-03-31T09:02:36.600Z',
//   __v: 0
// }
function order({ orders }) {
  console.log(orders);
  return (
    <>
      <Head>
        <title>My orders</title>
      </Head>
      <div className={style.main}>
        <Container maxWidth="md">
          {orders.map((order, index) => {
            return (
              <Box key={index}>
                {order.items.map((item) => {
                  return (
                    <Box key={item}  sx={{
                      display: "flex",
                      gap: "20px",
                      margin: "8px",
                      padding: "8px",
                      border: ".5px solid #dee2e6",
                    }}>
                      <img
                        style={{
                          width: "120px",
                          height: "100px",
                          padding: "3px",
                          cursor: "pointer",
                        }}
                        src={item.productId.thumbnail}
                        alt="Paella dish"
                        // onClick={() => detailed(item.productId.title)}
                      />
                      <Divider orientation="horizontal" sx={{borderWidth:"1px"}}/>
                      <Typography variant="h6" >{item.productId.title}</Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Container>
      </div>
    </>
  );
}

export default order;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers.cookie;

  if (!cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    let api = await fetch(`${process.env.BASE_URL}/api/user/order`, {
      method: "GET",
      headers: {
        authorization: cookie,
      },
    });
    let orders = await api.json();
    orders = orders.orders;
    return {
      props: { orders },
    };
  }
}
