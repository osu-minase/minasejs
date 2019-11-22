const route = require('express').Router();
const util = require('../util');
const utils = require('util');
route.get('/', async (req, res) => {
        res.render('test', {
            req: req,
            avatarurl: `https://a.minase.tk/${req.session.userid}`
        })
})

module.exports = route;