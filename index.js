const express = require('express');
const app = express();
const port = 1337;
const host = 'localhost';

app.listen(3000, 'localhost', () => {
    console.log(`Listening on http://${host}:${port}`)
})