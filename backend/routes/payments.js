const router = require('express').Router();
let Payments = require('../models/payments.model');

router.route('/').get((req, res) => {
    Payments.find()
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/history').get((req, res) => {
  Payments.find()
      .then(payments => res.json(payments))
      .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req, res) => {
    const year = req.body.year; 
    const month = req.body.month;
    const payments = {
        memberID: req.body.payments.memberID,
        package: req.body.payments.package
      }

    const newPayment = new Payments({
      year,
      month,
      payments
    });

    newPayment.save()
        .then(() => res.json("Transaction done!"))
        .catch(err => res.json(`Error: ${err}`))
});

// router.route('/:id').delete((req, res) => {
//     Payments.findByIdAndDelete(req.params.id)
//         .then(() => res.json("Payment deleted..."))
//         .catch(err => res.status(400).json(`Error: ${err}`))
// });

router.route('/update/:id').put((req, res) => {
    Payments.findOneAndUpdate({_id: req.params.id}, {$push: {payments : req.body.payments}})
          .then(() => res.json('Payment added to existing period...'))
          .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;