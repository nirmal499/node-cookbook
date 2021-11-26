const net = require("net");

const HOSTNAME = "localhost";
const PORT = 3000;
const socket = net.connect(PORT, HOSTNAME);

/* Sending data to server */
socket.write("World");

/* This will listen for data returned by the socket/server */
socket.on("data", (data) => {
    console.log(data.toString());
});