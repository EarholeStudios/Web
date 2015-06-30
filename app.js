/**
 * Dependencies
 */
var path    = require('path')
,   express = require('express')
,   morgan  = require('morgan')
,   config  = require('config')
,   app     = module.exports = express();

/**
 * Setup
 */
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'build')));

/**
 * Boot Server
 */
app.listen(config.get('port'));
