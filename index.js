const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
app.set('view engine', 'ejs');
//IMPORTS
app.use(express.static('static'));
const homepage = require('./routes/homepage');

app.use('/', homepage)
app.listen(3000, host, () => {
    console.log(`Listening on http://${host}:${port}`)
})