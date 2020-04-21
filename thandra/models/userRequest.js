const mongoose = require('mongoose');

const { Schema } = mongoose;

const userRequest = new Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    requestedOn: { type: String, default: Date() },
    carRequiredFrom: { type: Number, required: true },
    carRequiredTo: { type: Number, required: true },
    requestStatus: { type: String, default: "pending" },
    carNumber: { type: String, required: true }
    // liscence: { type: String, required: true },
});

module.exports = mongoose.model('userRequest', userRequest);