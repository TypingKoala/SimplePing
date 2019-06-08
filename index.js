// Initializing all the packages
var express = require('express');
var path = require('path');

// Initialize the config file
var config = require('./config');

// Setting up constants
const app = express();
var expressWs = require('express-ws')(app);
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



app.listen(port, () => {
    console.log(`The magic happens on port ${port}.`)
})