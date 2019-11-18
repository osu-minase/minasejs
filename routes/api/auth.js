const route = require('express').Router();//Router, not wifi /shrug
const bcrypt = require('bcryptjs');//Password hashes
const jwt = require('jsonwebtoken');//Tokens
const joi = require('@hapi/joi');//Validation
const utils = require('../../util');
const md5 = require('md5');
//I go sleep, tomorrow will continiune
route.get('/login', async (req, res) => {
    const response = await utils.getUserLogin(999);
    res.send(require('util').inspect(response))
    
})

route.post('/login', async (req, res) => {
    let password = req.body.password;//freaking md5
    let login =  req.body.login;
    if(!login) return res.send('Error: i need login');
    if(!password) return res.end('password please')
    let id = await utils.getUserIdByUsername(login);
в
    if(!id){
        return res.end('Error: user not found')
    }
    let database_data = await utils.getUserLogin(id);
    
    if(!database_data){
        return res.send(`Cannot find the user! userid: ${id}`);
    }
    let password_enc = md5(password); // lets encrypt this password!
    const validation = await bcrypt.compare(password_enc, database_data[0].password_md5);
    if(!validation) {
        return res.send('Error: incorrect password or login')
    }
    let reponse_data = jwt.sign({userid: id, password: password_enc})
    res.send(response_data);
})
module.exports = route;