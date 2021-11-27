/* we can communicate between a browser and server using WebSockets */
const fs = require("fs");
const http = require("http");
const index = fs.readFileSync("public/index.html");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end(index);
});

server.listen(8080, "0.0.0.0", () => {
    console.log("Listening to port " + server.address().port);
});