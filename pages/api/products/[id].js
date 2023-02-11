import connectDb from "../../../utils/dbConnect";
import productModel from "../../../models/productModel";

const handler = async (req, res) => {
  try {
      let id = req.query.id
    let product = await productModel.findOne({_id:id})
    return res.status(200).send(product)

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export default connectDb(handler);
