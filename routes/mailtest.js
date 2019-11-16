const route = require('express').Router();
const utils = require('../util');
route.get('/test', async (req, res) => {
    utils.sendMail('kotypey@gmail.com', 'Test', 'Hello world, this is test mail')
    res.send('OK')
})

module.exports = route;