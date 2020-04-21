const mongoose = require('mongoose');

const { Schema } = mongoose;

const admin = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    password:{ type: String, required: true },
    // liscence: { type: String, required: true },
});

module.exports = mongoose.model('admin', admin);