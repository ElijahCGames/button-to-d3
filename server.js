// Express for server
// Johnny-five for arduino
const express = require('express');
const five = require('johnny-five');

// Sets our express
const app = express();
const port = 3000;

// Counts two buttons, red and yellow
var rvalue = 0;
var yvalue = 0;

// Sets the headers for the requests
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Sends the data from a get request
app.get('/', (req, res) => {
  res.json({v:[rvalue,yvalue]});
});

// Listen at the port (3000 for us)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


// Initilize board
board = new five.Board();

// If board is there
board.on("ready", function() {

    // Create new `button`s hardware instance.
    const rbutton = new five.Button(2);
    const ybutton = new five.Button(4);

    // Inject the `button` hardware into
    // the Repl instance's context;
    // allows direct command line access
    // Used to console log
    board.repl.inject({
      button: rbutton
    });
  
    
    // "down" the button is pressed
    rbutton.on("down", function() {
      rvalue += 1;
    });

    ybutton.on("down", function(){
        yvalue += 1;
    })
  });
  