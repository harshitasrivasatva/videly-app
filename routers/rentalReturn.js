// POST /api/returns { customerId,movieId }

// REturn 401 if client is not login
// REturn 400 if customerId is not provided 
// REturn 400 if movieId is not provided
// REturn 404 if no rental found for this customer/movie
// REturn 400 if rental already processed
// REturn 200 if valid request
// Set the return date
// Calculate the rental fee
// Increase the stock
// Return the rental


const express = require('express');
const router  = express.Router();

router.post('/',async (req,res) => {
    res.status(401).send('Unauthorized');
});

module.exports = router;