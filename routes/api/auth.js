const route = require('express').Router();//Router, not wifi /shrug
const bcrypt = require('bcryptjs');//Password hashes
const jwt = require('jsonwebtoken');//Tokens
const joi = require('@hapi/joi');//Validation
const utils = require('../../util');
const md5 = require('md5');
//I go sleep, tomorrow will continiune
route.get('/login', async (req, res) => {
    res.render('login', {
        req: req,
        userid: req.session.userid
    })
    
})

route.post('/login', async (req, res) => {
    let password = req.body.password;//freaking md5
    let login =  req.body.login;
    if(!login) return res.send('Error: i need login');
    if(!password) return res.end('password please')
    let id = await utils.getUserIdByUsername(login);
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
    let reponse_data = jwt.sign({userid: id, password: password_enc}, config.webserver.jwt_secret);
    req.session.token = reponse_data;
    req.session.userid = id;
    res.redirect('/');
})

//Register
route.get('/register', (req, res) => {
    res.render('register', {
        req: req
    })
})

route.post('/register', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let password_repeat = req.body.repeat_password;
    let email = req.body.email;
    if(!email.includes('@')){
        return res.send('Invalid email');
    }
    if(password.lenght < 8){
        return res.send('Password is too stupid');
    }
    if(password !== password_repeat){
        return res.send('Password doesn`t match');
    }
    let id = await utils.getUserIdByUsername(username);
    if(id){
        return res.send('This username is already claimed');
    }

    if(username.lenght < 2){
        return res.send('Username is too short');
    }
    //All is ok
    let safe_username = username.toString().replace(' ', '_').toLowerCase();
    let password_md5 = md5(password);
    let password_enc = await bcrypt.hashSync(password_md5);
    db.query(`INSERT INTO \`users\`
    (username,
        username_safe,
        password_md5,
        salt,
        email,
        register_datetime, 
        rank, 
        allowed, 
        latest_activity, 
        silence_end, 
        silence_reason, 
        password_version, 
        privileges, 
        donor_expire, 
        flags, 
        achievements_version) VALUES(
            "${username}",
            "${safe_username}",
            "${password_enc}",
            "",
            "${email}",
            "${new Date().toTimeString()}",
            4,
            1,
            0,
            0,
            "",
            2,
            3,
            0,
            0,
            0

        )`)
        res.send('Done!')


})
module.exports = route;