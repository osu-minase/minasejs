const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const homepage_route = require('./routes/homepage')
global.app = express();
options = {host: 'localhost',user: 'root',database: 'ripple'};
(async () => {
    global.db = await mysql.createPool(options);
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use('/static', express.static('static'));




    
    app.use('/', homepage_route);





    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
})();
