import Head from 'next/head';
import React from 'react'
import style from "../../styles/Home.module.css";
function order({orders}) {
  console.log(orders)
  return (
    <>
      <Head>
        <title>My orders</title>
      </Head>
      <div className={style.main}>
      here is your orders
    </div>
    </>
  )
}

export default order

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
    let api = await fetch(`${process.env.BASE_URL}/api/order`,{
      method:"GET",
      headers:{
        authorization:cookie
      }
    })
    let orders = api.json();
    return {
      props: {},
    };
  }
}
