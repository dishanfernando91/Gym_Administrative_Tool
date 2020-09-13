const mongoose = require('mongoose');
const Package = require('./packages.model.js');
const PackageSchema = mongoose.model('Package').schema;
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    memberID : { type: String, required: true },
    invoiceDate: { type: Date, required: true},
    package: { type: Schema.Types.ObjectId, ref: 'Packages'}
}, {
    timestamps: true,
});

const Payments = mongoose.model('Payments', paymentSchema);

module.exports = Payments;