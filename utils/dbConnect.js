import mongoose from 'mongoose'

const connectDb = handler =>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb+srv://testing:TXPxQZxsp8BSnQb9@cluster0.jhebhrt.mongodb.net/next-project')
    return handler(req,res)
}

export default connectDb