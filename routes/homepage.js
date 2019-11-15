const route = require('express').Router();
const util = require('../util');
const utils = require('util');
route.get('/', async (req, res) => {
    [userdata] = await util.getUserStats(1000);
    res.render('test', {
        id: userdata.id,
        username: userdata.username,
        pp: userdata.pp_std,
        raw: utils.inspect(userdata)
    })
})

module.exports = route;