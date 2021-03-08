# button-to-d3
 
Python and Node.js ways to manage arduino and a web server for ambient displays.

You can use the web server stuff and put your own displays/arduino content.

This example uses an arduino button to change the radius of a d3 circle. 

You don't need to use d3 for the general system to work, it's just being used in this example.

### How to Setup and Use
##### Setup Arduino
Both the Python and Node.js solutions use Firmata to talk with the arduino. 

* Navigate to File > Examples > Firmata > StandardFirmataPlus in the Arduino IDE
* Load the sketch onto your board

That's it! Your scripts can now talk with the board. 

* The Node.JS script uses a library called [Johnny-Five](http://johnny-five.io/)
  * Johnny Five is a great high level library that feels like the javascript version of Arduino code.
  * If using Arduino components in many ways is imporatnt, I'd recommend using Node.JS with J5 - even if you aren't using a web display, the whole thing works.
* The python script uses a library called [pyfirmata](https://pyfirmata.readthedocs.io/en/latest/)
  * PyFirmata is lower level, dealing specfically with input and output from pins. 
  * If using the dataset in many ways is important, I'd recommend using the python script and making good use of pandas

_A quick note_:
The Node.JS script works with firmata from the get go, as long as the borad is plugged in and has StandardFirmataPlus it will work
The python script will need you to specify the usb port your borad is plugged into. It's the same port that you connect to on the Arduino IDE

![Diagram for the button](http://johnny-five.io/img/breadboard/button.png)


Here's how to setup the board for the button. [Taken from the button tutorial from Johnny-Five](http://johnny-five.io/examples/button/)
When the button is pushed pin 2 will get 5V.

##### For Python
* You need python installed on your computer to run
* `pip install pyfirmata`
* Optionally make sure numpy and pandas are also installed if you want to use python to manage your data set
* Open Commnand Line and cd to the button-to-d3 directory (or wherever your files are)
* Run `python server.py`
* Open index.html in your browser

##### For Node.JS
* You need Node.js installed
* Open Commnand Line and cd to the button-to-d3 directory (or wherever your files are)
* Run `node server.js`
* Open index.html in your browser

If everything works you should see a black circle on index.html.
When you press or hold down the button 

### Troublehshooting

* Make sure your board is plugged in properly and you can select the port in the Arduino IDE.
  * This is important, neither script will work if the board is not plugged in.
* You might've put buttons in the wrong pins, check to see that one button is in pin 2, and if you have a second button it should be in pin 4
* Check your circuit again to see all the wires are going to the right place.
* Make sure every library is installed
* D3 can sometimes not load properly, check the inspector on index.html to see if there are any errors
