import React from 'react'
import style from '../styles/Home.module.css'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'

function OrderPlace(props) {
    const{cart,placeOrder} = props
    
  return (
    <div className={style.main}>
        <Container maxWidth="md" className={style.checkout}>
          <Box>
                <Typography variant="h4" color="initial">Payment Method</Typography>
          </Box>
          <Box>
                <Typography variant="h4" color="initial">order details</Typography>

          </Box>
        </Container>
      this is order page
    </div>
  )
}

export default OrderPlace
