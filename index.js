// Initializing all the packages
const http = require('http');
const https = require('https');
const fs = require('fs');
var express = require('express');
var path = require('path');

// Initialize the config file
var config = require('./config');

const app = express();

if (config.ssl) {
    var server = https.createServer({
        key: fs.readFileSync(config.keyPath),
        cert: fs.readFileSync(config.certPath)
    }, app).listen(3000, () => {
        console.log("The magic happens on port 3000.")
    });
} else {
    var server = http.createServer(app).listen(3000, () => {
        console.log("The magic happens on port 3000.")
    });
}

var expressWs = require('express-ws')(app, server);

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

