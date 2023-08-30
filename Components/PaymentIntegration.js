import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrderPlace from './OrderPlace';
import style from '../styles/Home.module.css'
import { CustomButton } from '../utils/customButton';
import { useRouter } from 'next/router';

const Payment = ({amount,name,contact,placeOrder,setForm}) => {
  const router = useRouter()
    const[success,setSuccess]=useState(false)
    const[error,setError]=useState(false)
  useEffect(() => {
    const loadScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => {
            resolve();
          };
          document.body.appendChild(script);
        });
      };

    const handlePayment = async () => {
        if (!window.Razorpay) {
            await loadScript();
            window.Razorpay = window.Razorpay || {};
          }
    
        const options = {
          key:"rzp_test_KZ8bJKeOE5xsxI",
          amount: amount*100, // Amount in paise (10000 paise = ₹100)
          currency: 'INR',
          name: 'Bettermart',
          description: 'Payment for your order',
          image: 'https://better-mart.netlify.app/_next/image?url=%2Flogo.png&w=128&q=75',
          // prefill:{
          //   name,
          //   contact
          // },
          // orderId:response.orderId,
          theme:{
            color:"#b922fa"
          },
          handler: function (response) {
            if (response.error) {
                // Handle payment failure
                setError(true)
            } else {
              alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature)
                  placeOrder()
                // Handle payment success
                setSuccess(true)
              }
          },
          onpaymentfailed: function (response) {
            if(response.error){
                setError(true)
            }
          },
          modal: {
            ondismiss: function(){
              setForm(false)
            }
        }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        
      };

    handlePayment();
  }, []);

  return (
    <div>
    {success && <OrderPlace/>}
    {error && <div className={style.main}>
      <Container sx={{display:"flex",textAlign:"center"}} maxWidth="md" className={style.checkout}>
        <Typography variant="h4" color="initial">
        Payment Failed! Please try again
        </Typography>
        <CustomButton>GoTo Orders</CustomButton>
      </Container>
    </div>}
    </div>
  );
};

export default Payment;