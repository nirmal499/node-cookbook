const http = require("http");

http.get("http://example.com", (res) => res.pipe(process.
    stdout));