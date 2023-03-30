import React from 'react'
import style from '../styles/Home.module.css'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/router'
import { useEffect } from 'react'


function OrderPlace(props) {
  const router = useRouter();

  useEffect(()=>{
    setTimeout(() => {
      router.push('/')
    }, 2000);
  },[])
    
    
  return (
    <div className={style.main}>
        <Container maxWidth="md" className={style.checkout}>
          {/* <Box> */}
          <CheckCircleOutlineIcon sx={{    fontSize: "6rem", color: "blueviolet"}}/>
          <Typography variant="h4" color="initial">Your order has been placed successfully</Typography>

          {/* </Box> */}
        </Container>
    </div>
  )
}

export default OrderPlace
