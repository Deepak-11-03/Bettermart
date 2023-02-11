import connectDb from "../../../utils/dbConnect";
import productModel from "../../../models/productModel";

const handler = async (req, res) => {
  try {
    let products = await productModel.find()
    return res.status(200).send({products:products})

  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
export default connectDb(handler);
