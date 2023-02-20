import productModel from "../../../models/productModel";
import jwt from 'jsonwebtoken'
import connectDb from "../../../utils/dbConnect";
import cartModel from "../../../models/cartModel";


const handler =async(req,res)=>{
    try {
        const user = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key)
        if(!user){
            return res.status(401).send({msg:"something wrong"})
          }
        let {qty,id} = req.body
        let userCart = await cartModel.findOne({userId:user.userId})
        let product = await productModel.findOne({_id:id})
        
        const item = userCart.items.findIndex(x=>x.productId == id)
            let cartProduct = userCart.items[item]
            let cartData={}
            if(qty > cartProduct.quantity){
                cartProduct.quantity += 1
                cartData.items =  userCart.items
                cartData.totalPrice = userCart.totalPrice + product.price
                cartData.totalItems =  userCart.totalItems + 1
                let cart = await cartModel.findOneAndUpdate({userId:user.userId},cartData,{new:true}).populate('items.productId').select({_id:0,userId:0});
                return res.status(200).send({cart})
            }
            else if(qty < 1){
                let totalPrice = userCart.totalPrice;
                let totalItems = userCart.totalItems;
                totalPrice -= product.price * cartProduct.quantity
                totalItems -= cartProduct.quantity
                let cart= await cartModel.findOneAndUpdate({userId: user.userId }, { $pull: { items: { productId: cartProduct.productId } }, $set: { totalPrice: totalPrice ,totalItems:totalItems }}, { new: true }).populate('items.productId').select({_id:0,userId:0});
                 return res.status(200).send({cart})
            }
            else  {
                cartProduct.quantity -= 1
                cartData.items =  userCart.items
                cartData.totalPrice = userCart.totalPrice - product.price
                cartData.totalItems =  userCart.totalItems - 1
                let cart = await cartModel.findOneAndUpdate({userId:user.userId},cartData,{new:true}).populate('items.productId').select({_id:0,userId:0});
                 return res.status(200).send({cart})
            }

        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

export default connectDb(handler);