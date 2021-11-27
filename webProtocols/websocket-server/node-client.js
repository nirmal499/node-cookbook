/* create a WebSocket client in Node.js, enabling two Node.js programs to communicate over WebSockets  */
const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000");

ws.on("open", () => {
    console.log("Connected");
});
ws.on("close", () => {
    console.log("Disconnected");
});
ws.on("message", (message) => {
    console.log("Received:", message.toString());
});

/* end the message Hello to the WebSocket server every 3 seconds */
setInterval(() => {
    ws.send("Hello");
}, 3000);