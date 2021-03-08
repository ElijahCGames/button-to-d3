const { csvFormatValue } = require('d3');
const express = require('express');
const five = require('johnny-five');

const app = express();
const port = 3000;


var rvalue = 0;
var yvalue = 0;

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

app.get('/', (req, res) => {
  res.json({v:[rvalue,yvalue]});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

board = new five.Board();

board.on("ready", function() {

    // Create a new `button` hardware instance.
    // This example allows the button module to
    // create a completely default instance
    const rbutton = new five.Button(2);
    const ybutton = new five.Button(4);
    // Inject the `button` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
      button: rbutton
    });
  
    // Button Event API 
  
    // "down" the button is pressed
    rbutton.on("down", function() {
      rvalue += 1;
    });

    ybutton.on("down", function(){
        yvalue += 1;
    })
  });
  