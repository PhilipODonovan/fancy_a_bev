import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' , // Reference to the User model
        required: [true, "Please enter user"],
    },
    bev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bevs' , // Reference to the Bev model
        required: [true, "Please enter bev"],     
    }
,
    qty: {
       type: Number,
       required: [true, "Please enter a quantity"],
    },

    invoice:{
        type: String,
        required: [true, "Please enter invoice number"],
    },
},
    { timestamps: true }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;