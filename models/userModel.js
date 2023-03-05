import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone:  {
        type:String,
        required:true,
        unique:true
    },
    password:  {
        type:String,
        required:true
    },
    // address:{
    //     houseNo:{type:String,required:true},
    //     street:{type:String,required:true},
    //     area:{type:String,required:true},
    //     city:{type:String,required:true},
    //     state:{type:String,required:true},
    //     pincode:{type:Number,required:true},
    // },
    verified:{
        type:Boolean,
        default:false
    },
    otpToken:String
})

export default mongoose.models.User || mongoose.model('User' ,userSchema)