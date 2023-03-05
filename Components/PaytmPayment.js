// import { useState } from 'react';
// import PaytmCheckout from 'paytm-pg-node-sdk';

// export default function PaytmPaymentButton() {
//   const [transactionData, setTransactionData] = useState(null);

//   const initiatePayment = async () => {
//     const orderData = {
//       amount: 100,
//       customerName: 'John Doe',
//       customerId: '123456',
//       customerEmail: 'john.doe@example.com',
//       customerPhone: '1234567890',
//     };

//     const transactionToken = await PaytmCheckout.getTransactionToken(orderData);

//     if (transactionToken.status === 'SUCCESS') {
//       setTransactionData(transactionToken.body.txnToken);
//     } else {
//       console.log('Error:', transactionToken.status);
//     }
//   };

//   return (
//     <>
//       <button onClick={initiatePayment}>Pay with Paytm</button>
//       {transactionData && (
//         <PaytmCheckout
//           amount={100}
//           transactionData={transactionData}
//           merchantId={process.env.MERCHANT_ID}
//           merchantKey={process.env.MERCHANT_KEY}
//           website="http://localhost:3000"
//           callbackUrl="https://example.com/paytm/callback"
//         />
//       )}
//     </>
//   );
// }