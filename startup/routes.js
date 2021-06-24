const genres     = require('../routers/genres');
const rentals    = require('../routers/rental');
const custumers  = require('../routers/customers');
const movies     = require('../routers/movies');
const users      = require('../routers/users');
const auth       = require('../routers/auth');
const error      = require('../middleware/error');
const returns    = require('../routers/rentalReturn');
const express    = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/custumers',custumers);
    app.use('/api/rentals',rentals);
    app.use('/api/returns',returns);
    app.use('/api/movies/',movies);
    app.use('/api/genres',genres);
    app.use('/api/users/',users);
    app.use('/api/auth',auth);
    app.use(error);
}