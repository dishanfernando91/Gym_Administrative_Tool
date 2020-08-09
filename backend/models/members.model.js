const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: true},
    gender: {type: String, required: true},
    // image: {type: File, required: false}

    // features: {
    //     height: { type: Number, require: false },
    //     weight: { type: Number, require: false },
    //     bodyFat: { type: Number, require: false },
    //     waist: { type: Number, require: false },
    // }
}, {
    timestamps: true,
});

const Members = mongoose.model('Members', memberSchema);

module.exports = Members;