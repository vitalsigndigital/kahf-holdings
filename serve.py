# Dev server for kahf-holdings — serves with no-cache headers so edits show immediately
import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

if __name__ == "__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1", 8125), NoCacheHandler).serve_forever()
