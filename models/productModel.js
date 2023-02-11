import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    brand: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true,
    },
    price:  {
        type:Number,
        required:true,
    },
    discountPercentage:{
        type:String,
        required:true,
    },
    rating:  {
        type:String,
        required:true
    },
    category:  {
        type:String,
        required:true
    },
    thumbnail: {
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true
    }]
})

export default mongoose.models.Product || mongoose.model('Product' ,productSchema)