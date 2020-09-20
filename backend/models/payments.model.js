const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    year: { type: String, default: new Date().getFullYear() },
    month: { type: String, default: new Date().toLocaleDateString('default', {month: 'long'}) },
    payments : [{
        memberID : { type: String, required: true},
        package: { type: String, required: true }
    }]
}, {
    timestamps: true,
});

const Payments = mongoose.model('Payments', paymentSchema);

module.exports = Payments;