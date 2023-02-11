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
    }
    // address:{

    // }
})

export default mongoose.models.User || mongoose.model('User' ,userSchema)