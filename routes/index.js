const {Router} = require('express')
const authRoutes = require('./auth.routes');

const routes = Router();

routes.use('/auth', authRoutes);

module.exports = routes;