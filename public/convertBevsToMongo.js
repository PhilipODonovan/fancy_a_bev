const fs = require("fs");
const { ObjectId } = require("mongodb");

// Load the input file
const bevs = JSON.parse(fs.readFileSync("bevs.json", "utf8"));

// Convert each item to MongoDB-style format
const mongoFormatted = bevs.map(item => {
  return {
    _id: new ObjectId(),                  // generates new Mongo IDs
    make: item.make,
    model: item.model,
    variant: item.variant,
    bodytype: item.bodytype,
    price: item.price,
    image: item.image,
    features: item.features,
    available_from: item.available_from,
    range: item.range,
    battery_capacity: item.battery_capacity,
    efficiency: item.efficiency,
    fastcharge_speed: item.fastcharge_speed,
    status: item.status,
    annual_tax: item.annual_tax,
    maint_interval: item.maint_interval,
    user_id: item.user_id,
    created_at: item.created_at,
    updated_at: item.updated_at
  };
});

// Save output
fs.writeFileSync("bevs_mongo.json", JSON.stringify(mongoFormatted, null, 2));

console.log("✅ Conversion complete: bevs_mongo.json created");