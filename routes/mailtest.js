const route = require('express').Router();
const utils = require('../util');
route.get('/test', async (req, res) => {
    let email = utils.sendMail('kotypey@gmail.com', 'Test', 'Hello world, this is test mail')
    res.send(require('util').inspect(email))
})

module.exports = route;