# Server.py

# Counts the amount of button presses on the board
# Sends that value over an HTTP get request

# Server and Data
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

# Serial Port
import pyfirmata

# Threading
import threading
import time

# Data - Not used here but will make life easier when dealing with datasets
import pandas as pd
import numpy as np

# Button Count
v = 0;

# Server Class 
class S(BaseHTTPRequestHandler):

    # Sets the headers for the response. 
    # We're sending json data
    # Access-Control-Allow-Orgin let's us work from anywhere. 
    # This isn't safe, but works for the project
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.send_header('Access-Control-Allow-Origin','*')
        self.end_headers()
    
    # Get Request
    # We set the response
    # Convert a dictonary into json, in this case a dictonary containing the button int
    # Sends it out
    def do_GET(self):
        self._set_response()
        json_str = json.dumps({"v":[v]})
        self.wfile.write(json_str.encode(encoding='utf_8'))

# Runs the server
def run(server_class=HTTPServer,handler_class=S,port=3000):
    # Gets teh adddress and sets that up
    server_address = ('',port)
    httpd = server_class(server_address,handler_class)

    print(f"Serving at port http://localhost:{port}")

    # Runs the server forvver until  you hit ctrl-c
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

# Thread 1: Does the server stuff
def server():
    run()

# Thread 2: Does the arduino stuff
# This is a simple function that checks if the button at pin 2 is being pressed
def ardunio(buttonPin):
    while(True):
        # Reads the pin at pin 2
        sw = buttonPin.read()

        # If it is on
        if sw is True:
            # Pring that
            print("Button Down")
            # Add to the global value v
            global v
            v += 1
        # Wait a thenth of a second
        time.sleep(0.1)

# Main function
if __name__ == '__main__':
    from sys import argv

    # Setting up the board, 
    # Use whatever serial port you are plugged into (what you choose in Arudino)
    board = pyfirmata.Arduino('/dev/cu.usbserial-14410')
    it = pyfirmata.util.Iterator(board)
    it.start()
    # Sets the pin for the button
    # Digital, Pin 2, Input
    digital_input = board.get_pin('d:2:i')

    # Sets up the threading, one for the server and one for the ardunio 
    t = threading.Thread(name='server', target=server)
    w = threading.Thread(name='ardunio', target=ardunio,args=[digital_input])
    
    w.start()

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        t.start()
