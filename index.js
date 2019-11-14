const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
global.app = express();
options = {host: 'localhost',user: 'root',database: 'ripple'};
(async () => {
    global.db = await mysql.createPool(options);
    [rows] = await db.query('SELECT * FROM users where id=1000;');
    [stats] = await db.query('SELECT pp_std FROM users_stats where id=1000;');
    app.use(bodyParser.json());
    app.set('view engine', 'ejs')
    app.use('/static', express.static('static'));
    app.get('/', (req, res) => {
        res.render('test', {
            id: rows[0].id,
            username: rows[0].username,
            pp: stats[0].pp_std,
            raw: require('util').inspect(stats)

        })
    })
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
})();
