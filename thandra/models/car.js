const mongoose = require('mongoose');

const { Schema } = mongoose;

const car = new Schema({
  carName: { type: String, required: true },
  carNumber: { type: String, required: true , unique: true },
  carStatus: { type: String, default: 1 },
  seater: { type: Number, required: true },
  amenities: { type: [String], required: true },
  oneDayCost:{type: Number, required :true}
});

module.exports = mongoose.model('car', car);