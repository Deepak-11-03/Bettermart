
import style from '../../../styles/Home.module.css';

import { useRouter } from "next/router";
import Error from "../../_error";
import Head from "next/head";
import ProductList from "../../../Components/ProductList";

export default function Beauty({ data }) {
  const router = useRouter();
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
        <ProductList data={data} />
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
