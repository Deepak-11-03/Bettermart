import cartModel from "../../../models/cartModel"
// import userModel from "../../../models/userModel"
import orderModel from "../../../models/orderModel"
import connectDb from "../../../utils/dbConnect";
import jwt  from "jsonwebtoken";

const handler =async(req,res)=>{
   if(req.method === "POST"){
    try {
        console.log(req.body)
        const token = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key);
        const userCart = await cartModel.findOne({userId:token.userId})
        let orderDetails ={}
        orderDetails.userId = token.userId;
        orderDetails.items = userCart.items;
        orderDetails.totalPrice = userCart.totalPrice;
        orderDetails.totalItems  =userCart.totalItems;
        let order = await orderModel.create(orderDetails);
        userCart.items = [];
        userCart.totalPrice=0;
        userCart.totalItems =0
        userCart.save();
        return res.status(200).send({status:true,msg:"Order Placed"})

    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
   }
   if(req.method === "GET"){
    try {
        console.log(req)
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
   }
}

export default connectDb(handler)

