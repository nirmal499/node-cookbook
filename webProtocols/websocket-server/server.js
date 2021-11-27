/* The WebSocket protocol enables two-way communication between a browser and a
server. WebSockets are commonly leveraged for building real-time web applications,
such as instant messaging clients */
/*  we're going to use the third-party ws module to create a WebSocket server
that we can interact with via our browser */

const WebSocket = require("ws");

const WebSocketServer = new WebSocket.Server({
    port: 3000,
});

WebSocketServer.on("connection", (socket) => {
    socket.on("message", (msg) => {
        console.log("Received:", msg.toString());
        if (msg.toString() === "Hello") socket.send("World!");
    });
});