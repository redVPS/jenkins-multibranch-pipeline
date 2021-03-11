const express = require("express");
const app = express();
const path = __dirname + '/views/';
const port = process.env.PORT || 3000;

// Define static path for assets
app.use(express.static(path));

// Define request response for root URL (/)
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path + 'index.html');
});

// Define request response for /test
app.get('/test', (req, res) => {
    res.status(200);
    res.send("Hello World!!!");
});

app.listen(port, () => {
    console.log(`App is up and listening on port ${port}`);
});

module.exports = app;