const winston    = require('winston');
const express    = require('express');
const app        = express();

require('./startup/logins');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);
// require('./middleware/error')();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => winston.info('PORT is listening'));

module.exports = server;