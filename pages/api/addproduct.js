import productSchema from "../../models/productModel";
import connectDb from "../../middlerware/middlerware";

const handler = async (req, res) => {
  try {
    console.log(req.body)

    // let existingUser = await productSchema.findOne({ email, phone });
    // if (existingUser) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Email or phone already registered" });
    // }
    // await productSchema.create({firstName, lastName, email, phone, password});
    // return res.status(200).send({ msg: "created" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export default connectDb(handler);
