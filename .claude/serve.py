import os, http.server

os.chdir("/Users/axelbureau/Documents/sae cascade/site web/le-sentier-de-sillans")
server = http.server.HTTPServer(("", 4200), http.server.SimpleHTTPRequestHandler)
server.serve_forever()
