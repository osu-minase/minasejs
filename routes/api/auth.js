const route = require('express').Router();//Router, not wifi /shrug
const bcrypt = require('bcryptjs');//Password hashes
const jwt = require('jsonwebtoken');//Tokens
const joi = require('@hapi/joi');//Validation

//I go sleep, tomorrow will continiune
route.get('/login', async (req, res) => {
    res.sendFile('https://media.discordapp.net/attachments/604665666166980613/645352461338411039/1573798927951.jpg')
})
module.exports = route;