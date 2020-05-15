const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');
const { port } = require('../config/env');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Middleware
 */
middleware.init(app);

/**
 * @description express.Application Routes
 */
routes.init(app);

/**
 * @description sets port 3002 to default or unless otherwise specified in the environment
 */
app.set('port', port || 3002);

module.exports = app;
