import connectDb from "../../../../utils/dbConnect";
import productModel from "../../../../models/productModel";

const handler = async (req, res) => {
  try {
    const timeOutId = setTimeout(() => {
      return res.status(500).send({ status: false, msg: "something wrong" });
    }, 5000);
    let { category } = req.query;
    let products = await productModel.find({ category: category });
    clearTimeout(timeOutId);
    return res.status(200).send({status:true,products:products});
    //
  } catch (error) {
    return res.status(500).send({status:false, msg: error.message });
  }
};
export default connectDb(handler);
