const express = require('express');


const { validateCustomers, Customer} = require('../models/customers');

const router = express.Router();


//HTTP GET REQUEST
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('isGold');

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return status(404).send('The requested customer does not exist');

    res.send(customer);

});

//HTTP POST REQUEST
router.post('/', async (req, res) => {
    const { error } = validateCustomers(req.body);
    if (error) return status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});


//HTTP PUT REQUEST
router.put('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true});

    const { error } = validateCustomers(req.body);
    if (error) return status(400).send(error.details[0].message);

    if (!customer) return status(404).send('The requested customer does not exist');

    res.send(customer);
});

//HTTP DELETE REQUEST
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return status(404).send('The customer you request to delete does not exist');

    res.send('The requested customer has been deleted');
});




module.exports = router;