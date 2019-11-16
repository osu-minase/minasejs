const config = require('./config.json'); //CONFIG
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const homepage_route = require('./routes/homepage');
const redis = require('redis');
const redis_con = new redis.createClient({host: config.redis.host, db: config.redis.db, password: config.redis.password})
const express_app = express();
options = {host: config.database.host,user: config.database.user, password: config.database.password, database: config.database.database};

const mailer = require('nodemailer');
global.app = express_app;

global.redis = redis_con;
(async () => {
    const database = await mysql.createPool(options);
    global.db = database;
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');// что нужн?мммм
    app.use('/static', express.static('static')); // так ты же сразу обновляешь, не?, зачем пулы на гит
    const mailer_transporter = mailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure,
        auth: {
            user: config.mail.auth.user,
            pass: config.mail.auth.pass
        }
    })
    global.mailer = mailer_transporter;


    
    app.use('/', homepage_route);
    app.use(require('./routes/mailtest'));





    const PORT = config.webserver.port || 8080;
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
})();
