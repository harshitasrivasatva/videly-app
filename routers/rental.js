const {Rental, validate} = require('../model/rental');
const {Movie}            = require('../model/movies');
const {Customer}         = require('../model/customers');
const mongoose           = require('mongoose');
const Fawn               = require('fawn');
const express            = require('express');
const router             = express.Router();

Fawn.init(mongoose);

router.get('/',async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not availble');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: custmors.name,
            phone: custmor.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try{
        new Fawn.Task()
       .save('rental',rental)
       .update('movies',{ _id: movie._id }, {
           $inc: { numberInStock: -1}
       })
       .run();

        res.send(rental);
    }
    catch(err){
        res.status(500).send('Something went wrong');
    }
    
})

module.exports = router;