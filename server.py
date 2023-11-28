import http.server
import socketserver

# Custom handler class
class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        super().end_headers()

# Set the port
PORT = 8009

# Create an object of the above class
handler_object = MyHttpRequestHandler

# Set up the server
with socketserver.TCPServer(("", PORT), handler_object) as httpd:
    print("Server started at localhost:" + str(PORT))
    httpd.serve_forever()
