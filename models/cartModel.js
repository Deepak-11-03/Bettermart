import mongoose from 'mongoose'
const objectId = mongoose.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
        type: objectId,
        refs: 'User',
        // required: true
      },
      
      items: [{
        productId: {
             type:objectId,
            ref:'Product',
            required: true 
        },
        quantity: {
             type: Number, 
             required: true 
            },
            _id:false
      }],
      totalPrice: {
        type: Number,
        // required: true
      },
      totalItems: {
        type: Number,
        // required: true
      }
})

export default mongoose.models.Cart || mongoose.model('Cart' ,cartSchema)