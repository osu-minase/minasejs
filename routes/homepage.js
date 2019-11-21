const route = require('express').Router();
const util = require('../util');
const utils = require('util');
route.get('/', async (req, res) => {
    if(req.session.userid){
        res.render('test', {
            req: req,
            avatarurl: `https://a.minase.tk/${req.session.userid}`
        })
    }else{
        res.send('You are not logged in!')
    }
})

module.exports = route;