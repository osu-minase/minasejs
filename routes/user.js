const route = require('express').Router();
const utils = require('../util');
route.get('/u/:userid', async (req, res) => {
    let params = req.params;
    const user = await utils.getUserStats(parseInt(params.userid));

    res.render('user', {
        req: req,
        user: user
    })
})

module.exports = route;