const config = require('./config.json'); //CONFIG
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const homepage_route = require('./routes/homepage');
const redis = require('redis');
const redis = new redis.createClient({host: config.redis.host, db: config.redis.db, password: config.redis.password})
global.app = express();
options = {host: config.database.host,user: config.database.user, password: config.database.password, database: config.database.database};
(async () => {
    global.db = await mysql.createPool(options);
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use('/static', express.static('static'));




    
    app.use('/', homepage_route);





    const PORT = config.webserver.port || 8080;
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
})();
