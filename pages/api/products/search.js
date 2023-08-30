import connectDb from "../../../utils/dbConnect";
import productModel from "../../../models/productModel";

const handler = async (req, res) => {
  try {
    let {q} = req.query
    let filter = { $regex: q, $options: 'i' }
    let products = await productModel.find({$or:[{title:filter},{category:filter},{brand:filter}]});
    console.log(products)
    if(products.length === 0){
      return res.status(404).send({ status: true, msg:"Product not found",products: products});
    }
    // clearTimeout(timeOutId);
    return res.status(200).send({ status: true, products: products });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
export default connectDb(handler);
