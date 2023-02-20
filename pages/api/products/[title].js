import connectDb from "../../../utils/dbConnect";
import productModel from "../../../models/productModel";

const handler = async (req, res) => {
  try {
    const timeOutId = setTimeout(() => {
      return res.status(500).send({ status: false, msg: "something wrong" });
    }, 5000);

    let title = req.query.title;
    let product = await productModel.findOne({ title: title });
    clearTimeout(timeOutId);
    return res.status(200).send({ status: true, product: product });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
export default connectDb(handler);
