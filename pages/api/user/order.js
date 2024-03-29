import cartModel from "../../../models/cartModel"
// import userModel from "../../../models/userModel"
import orderModel from "../../../models/orderModel"
import connectDb from "../../../utils/dbConnect";
import jwt  from "jsonwebtoken";

const handler =async(req,res)=>{
   if(req.method === "POST"){
    try {
        let{name,phone,houseNo,street,area,pincode,city,state} = req.body
        const token = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key);
        const userCart = await cartModel.findOne({userId:token.userId})
        let shippingDetail = {
            name,phone,
            address:{
                houseNo:houseNo,
                area:area,
                street:street,
                city:city,
                pincode:pincode,
                state:state
            }
        }
        let orderDetails ={}
        orderDetails.userId = token.userId;
        orderDetails.items = userCart.items;
        orderDetails.totalPrice = userCart.totalPrice;
        orderDetails.totalItems  =userCart.totalItems;
        orderDetails.shippingDetails = shippingDetail
        console.log(orderDetails)
        await orderModel.create(orderDetails);
        await cartModel.findOneAndUpdate({userId:token.userId},{$set:{items:[],totalItems:0,totalPrice:0}},{new:true})
        return res.status(200).send({status:true,msg:"Order Placed"})

    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
   }
   if(req.method === "GET"){
    try {
        let authToken   =   req.headers.authorization.split('=')[1]
        const token = jwt.verify(authToken , process.env.Jwt_Secret_key);
      
        const userOrders = await orderModel.find({userId:token.userId}).populate('items.productId').select({_id:0,userId:0}).sort({createdAt:-1})
        return res.status(200).send({status:true,orders:userOrders})
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
   }
}

export default connectDb(handler)

