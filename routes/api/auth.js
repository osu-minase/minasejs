const route = require('express').Router();//Router, not wifi /shrug
const bcrypt = require('bcryptjs');//Password hashes
const jwt = require('jsonwebtoken');//Tokens
const joi = require('@hapi/joi');//Validation

//I go sleep, tomorrow will continiune
route.get('/login', async (req, res) => {
    res.sendFile('./img/401.jpg')
})
module.exports = route;