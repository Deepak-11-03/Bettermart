import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id: process.env.RAZARPAY_KEY_ID,
    key_secret: process.env.RAZARPAY_KEY_SECRET,
  });

export default instance