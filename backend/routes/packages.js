const router = require('express').Router();
let Packages = require('../models/packages.model');

router.route('/').get((req, res) => {
    Packages.find()
        .then(packages => res.json(packages))
        .catch(err => res.status(400).json(`Error: ${err}`))      
}); 

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const fee = req.body.fee;
    const duration = req.body.duration;

    const newPackage = new Packages({
        title,
        fee,
        duration
    });

    newPackage.save()
        .then(() => res.json("Package added!"))
        .catch(err => res.json(`Error: ${err}`))
});

router.route('/:id').delete((req, res) => {
    Packages.findByIdAndDelete(req.params.id)
        .then(() => res.json("Package deleted..."))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/update/:id').post((req, res) => {
    Packages.findById(req.params.id)
      .then(package => {
        package.title = req.body.title;
        package.fee = req.body.fee;
        package.duration = req.body.duration;

        package.save()
          .then(() => res.json('Package updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;