import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      refs: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: objectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    totalPrice: {
      type: Number,
    },
    totalItems: {
      type: Number,
      required:true
    },
    cancellable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancled"],
    },
    orderedAt:{
      type:String,
      default:new Date().toLocaleString()
    },
    shippingDetails:{
      name:String,
      phone:Number,
      address:{
        houseNo:{type:String,required:true},
        street:{type:String,required:true},
        area:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:Number,required:true},
    },
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
