/*  create a TCP server using the net Node.js core module: */
const net = require("net");

const HOSTNAME = "localhost";
const POST = 3000;

net.createServer((socket) => {
    console.log("Client Connected");
    socket.on("data", (name) => {
        /* Server takes the data coming from client and then gives back "Hello {data}" */
        socket.write(`Hello ${name}`);
    })
}).listen(POST, HOSTNAME);
