import mongoose from "mongoose";

const bevSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Please enter make"],
    },
    model: {
      type: String,
      required: [true, "Please enter model"],
    },
    variant: {
      type: String,
      required: [true, "Please enter variant"],
      trim: true,
    },
    bodytype: {
      type: String,
      required: [true, "Please enter body type"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    image: {
      type: String,
      required: false,
    },
    features: {
      type: String,
      required: false,
    },
    available_from: {
      type: Date,
      required: [true, "Please enter availability date"],
    },
    range: {
      type: Number,
      required: [true, "Please enter range (km)"],
    },
    battery_capacity: {
      type: Number,
      required: [true, "Please enter battery capacity (kWh)"],
    },
    efficiency: {
      type: Number,
      required: false,
    },
    fastcharge_speed: {
      type: Number,
      required: false,
    },
    status: {
      type: Number,
      default: 1, // active by default
    },
    annual_tax: {
      type: Number,
      required: false,
    },
    maint_interval: {
      type: Number,
      required: false,
    },
    user_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Bev = mongoose.models.bevs|| mongoose.model("bevs", bevSchema);

export default Bev;