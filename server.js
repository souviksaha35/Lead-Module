const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/lead-module'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'dist/lead-module'})
})

app.listen(process.env.PORT || 8080);