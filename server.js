const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/lead-module'));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'dist/lead-module'})
})

app.listen(port, () => {
    console.log(`App Listening on ${port}`)
});