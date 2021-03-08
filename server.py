from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import pandas as pd
import pyfirmata
import threading
import time

v = 2;

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.send_header('Access-Control-Allow-Origin','*')
        self.end_headers()
    
    def do_GET(self):
        self._set_response()
        json_str = json.dumps({"v":[v]})
        self.wfile.write(json_str.encode(encoding='utf_8'))

def run(server_class=HTTPServer,handler_class=S,port=3000):
    server_address = ('',port)
    httpd = server_class(server_address,handler_class)

    print(f"Serving at port http://localhost:{port}")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

def server():
    run()

def ardunio(buttonPin):
    while(True):
        sw = buttonPin.read()

        if sw is True:
            print("Button Down")
            global v
            v += 1
        
        time.sleep(0.1)

if __name__ == '__main__':
    from sys import argv

    board = pyfirmata.Arduino('/dev/cu.usbserial-14410')
    it = pyfirmata.util.Iterator(board)
    it.start()
    digital_input = board.get_pin('d:2:i')

    t = threading.Thread(name='server', target=server)
    w = threading.Thread(name='worker', target=ardunio,args=[digital_input])
    
    w.start()

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        t.start()
