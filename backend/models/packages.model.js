const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema({
    title: { type: String, required: false },
    fee: { type: Number, required: true },
    duration: { type: Number, required: false }
}, {
    timestamps: true,
});

const Packages = mongoose.model('Packages', packageSchema);

module.exports = Packages;