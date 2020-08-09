const router = require('express').Router();
let Members = require('../models/members.model');

router.route('/').get((req, res) => {
    Members.find()
        .then(members => res.json(members))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const gender = req.body.gender;
    // const image = req.body.image;

    // const height = Number(req.body.height);
    // const weight = Number(req.body.weight);
    // const bodyFat = Number(req.body.bodyFat);
    // const waist = Number(req.body.waist);

    const newMember = new Members({
        firstName,
        lastName,
        dateOfBirth,
        address,
        phoneNumber,
        gender,
        // image
        // features: { height, weight, bodyFat, waist }
    });

    newMember.save()
        .then(() => res.json("Member added!"))
        .catch(err => res.json(`Error: ${err}`))
});

router.route('/:id').delete((req, res) => {
    Members.findByIdAndDelete(req.params.id)
        .then(() => res.json("Member deleted..."))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/edit/:id').post((req, res) => {
    Members.findById(req.params.id)
        .then(member => {
            member.firstName = req.body.firstName
            member.lastName = req.body.lastName
            member.dateOfBirth = req.body.dateOfBirth
            member.address = req.body.address
            member.gender = req.body.gender
            // member.image = req.body.image

            // member.feature.height = Number(req.body.height)
            // member.feature.weight = Number(req.body.weight)
            // member.feature.bodyFat = Number(req.body.bodyFat)
            // member.feature.waist = Number(req.body.waist)

            member.save()
                .then(() => res.json("Member details updated!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;



