// Initializing all the packages
const https = require('https');
const fs = require('fs');
var express = require('express');
var path = require('path');

// Initialize the config file
var config = require('./config');

// Initialize SSL options
const options = {
    key: fs.readFileSync(config.keyPath),
    cert: fs.readFileSync(config.certPath)
}

// Setting up constants
const app = express();
const httpsserver = https.createServer(options, app)
var expressWs = require('express-ws')(app, httpsserver);
const port = 3000;

// default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// setup static server
app.use(express.static('public'))

app.ws('/ping', (ws, req) => {
    // on connection, send the location of the server
    ws.send(config.location);

    ws.on('message', (msg) => {
        // echo the message back to the client
        ws.send(msg);
    })
})

httpsserver.listen(3000, () => {
    console.log("The magic happens on port 3000.")
});