import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/Home.module.css";
import {
  Box,
  Typography,
} from "@mui/material";
import ProductList from "../../Components/ProductList";

function search() {
  const [searchData, setSearchData] = useState([]);
  const [msg,setMsg]=useState('')
  const router = useRouter();
  let { query } = router.query;
  useEffect(() => {
    const dataFetch = async () => {
      let api = await fetch(`/api/products/search?q=${query}`);
      api = await api.json();
      if(api.products.length !== 0){
        setSearchData(api);
      }
      else{
        setSearchData([])
      setMsg(api.msg)
      }
      console.log(api)
    };
    dataFetch();
  }, [query]);



  return (
    <div className={style.main}>
   
      {searchData.length === 0 ? (
        <Box sx={{ height: "50vh", paddingTop: "15rem", textAlign: "center" }}>
         {msg ?  <Typography variant="h4" color="initial">
                {msg}
            </Typography>:
            <Typography variant="h4" color="initial">
            Loading....
            </Typography>
            }
        </Box>
      ) : (
       <ProductList data={searchData} />
      )}
    </div>
  );
}

export default search;
