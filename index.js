const config = require('./config.json'); //CONFIG
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const homepage_route = require('./routes/homepage');
const redisl = require('redis');
const redis_con = new redisl.createClient({host: config.redis.host, db: config.redis.db, password: config.redis.password})
const express_app = express();
options = {host: config.database.host,user: config.database.user, password: config.database.password, database: config.database.database};

const mailer = require('nodemailer');
global.app = express_app;
global.config = config
global.redis = redis_con;
(async () => {
    const database = await mysql.createPool(options);
    global.db = database;

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

    app.use(session({
        secret: config.webserver.jwt_secret,
        resave: true,
        saveUninitialized:true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/', homepage_route);
    app.use(require('./routes/mailtest'));
    app.use(require('./routes/api/auth'))





    const PORT = config.webserver.port || 8080;
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
})();
