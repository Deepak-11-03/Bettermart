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
        unique:true
    },
    price:  {
        type:String,
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