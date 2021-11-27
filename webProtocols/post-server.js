const http = require("http");
const fs = require("fs");
const path = require("path");

const form = fs.readFileSync(path.join(__dirname, "public", "form.html"));

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        get(res);
        return;
    }
    if (req.method === "POST") {
        post(req, res);
        return;
    }
    error(405, res);
}).listen(PORT, HOSTNAME, () => {
    console.log(`Server listening on port ${server.address().port}`);
});

/* Our get() function sets the Content-Type HTTP header to text/html, as we're
expecting to return an HTML form. We call the res.end() function to finish the
WriteStream, writing the response and ending the HTTP connection */
function get(res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(form);
}

/* our post() function checks the Content-Type headers to determine
whether we can support the supplied values. In this instance, we only accept the
Content-Type "application/x-www-form-urlencode", and our error
function will be called if the request is sent with any other content type.
Within our request handler function, we register a listener for the data event. Each time
a chunk of data is received, we convert it to a string using the toString() method and
append it to our input variable.
Once all the data is received from the client, the end event is triggered. We pass a callback
function to the end event listener, which gets called only once all data is received. Our
callback logs the data received and returns the HTTP OK status message */
function post(req, res) {
    //console.log(req.headers);
    if (req.headers["content-type"] !== "application/x-www-form-urlencoded") {
        error(415, res);
        return;
    }

    let input = "";

    req.on("data", (chunk) => {
        input += chunk.toString();
    });

    req.on("end", () => {
        console.log(input);
        res.end(http.STATUS_CODES[200]);
    });
}

function error(code, res) {
    res.statusCode = code;
    res.end(http.STATUS_CODES[code]);
}