import userSchema from "../../models/userModel";
import connectDb from "../../utils/dbConnect";


const handler = async(req,res)=>{
    try {
        let {password,email}= req.body
        let userEmail = JSON.parse(email)
       
        const timeOutId = setTimeout(() => {
            return res.status(500).send({ status: false, msg: "something wrong" });
        }, 10000);
        
        let update  = await userSchema.findOneAndUpdate({email:userEmail},{$set:{password:password}})
        clearTimeout(timeOutId);
        if(!update){
            return res.status(400).send({status:false,msg:"something Wrong"})
        }
        return res.status(200).send({status:true,msg:"Password updated succesfully"})
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

export default connectDb(handler)