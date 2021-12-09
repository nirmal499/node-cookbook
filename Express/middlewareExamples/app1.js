const express = require("express");

const app = express();

/* We are passing res,req,next in all functions because that's how express works and provide us
    these three parameters */
function middleware1(req, res, next) {
    res.send('<h1>Hello World</h1>');
}

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
    /* The purpose of nextMiddleware is that if we call it as a function it will act as
        function call to the next middleware provided in the chain
    */
    responseObject.send('<h1>Hello World</h1>');
}


app.get('/', standardExpressCallback);

// app.get('/', (req, res, next) => {
//     res.send('<h1>Hello World</h1>');
// });

app.listen(3000);