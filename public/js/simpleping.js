var pingDiv = document.getElementById("ping");
pingDiv.innerHTML = "Connecting...";

var ws = new WebSocket(`ws://${location.host}/ping`);

// total samples to make
const totalSamples = 10;

// frequency to make samples (in hertz)
const frequency = 2;

// start time storage
var startTimes = new Array();

function pingTest(sequence = 0) {
    /*
    Starts a ping test with a certain number of 
    iterations at a given frequency, and updates 
    the pingDiv
    
    Input: 
    iterations {int} - the number of times to 
                       run the ping test
    frequency {int} - the number of pings per
                      second
    */

    // record the start time
    startTimes[sequence] = performance.now();

    /*
    send the ping message as the sequence number,
    to prevent transmission overlap 
    */
    ws.send(sequence);

    // check if the totalSamples has not been reached
    if (sequence + 1 < totalSamples) {
        // add pingTest back to execution stack after delay
        setTimeout(
            pingTest,
            1000 / frequency, // interval
            sequence + 1 // param 1
        )
    } else {
        // the test is over, lock in the reading by changing the style
        pingDiv.style.color = "black";
    }
}

ws.onopen = (evt) => {
    // start the pinging after 1 second
    setTimeout(pingTest, 1000);
}

// rewrite the onmessage event to set the pingDiv
ws.onmessage = (evt) => {
    // try to parse the message into an integer
    parsedInt = parseInt(evt.data)

    // if the parsed message is an integer and it has a corresponding start time
    if (parsedInt != NaN && parsedInt < startTimes.length) {
        // set the pingDiv to the ceiling of the ping
        pingDiv.innerHTML = Math.ceil(performance.now() - startTimes[parsedInt]).toString()
    } else { // otherwise, this message tells you the location
        console.log(`Connected to the ping server in ${evt.data}!`)
    }
}