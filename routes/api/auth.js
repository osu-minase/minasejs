const route = require('express').Router();//Router, not wifi /shrug
const bcrypt = require('bcryptjs');//Password hashes
const jwt = require('jsonwebtoken');//Tokens
const joi = require('@hapi/joi');//Validation
const utils = require('../../util');
//I go sleep, tomorrow will continiune
route.get('/login', async (req, res) => {
    const response = await utils.getUserLogin(1000);
    res.send(require('util').inspect(response))
    
})

route.post('/login', async (req, res) => {
    let password = req.body.password;
    let login =  req.body.login;
    if(!login) return res.send('Error: i need login');

    if(!password) return res.end('password please')
    let database_data = await utils.getUserLogin(1000);
    const validation = await bcrypt.compare(password, database_data[0].password_md5);
    console.log(validation)
    if(!validation) {
        return res.send('Error: incorrect password or login')
    }
    res.send(validation);
})
module.exports = route;