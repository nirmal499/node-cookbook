const express = require("express");

const app = express();

/* This is a global middleware, so it is going to be used in all the routes.
    It is not specific to only one route
*/
app.use(middleware2)

function middleware2(req, res, next) {
    console.log('I am a middleware2');
    next();
}

function standardExpressCallback2(requestObject, responseObject, nextMiddleware) {
    /* The purpose of nextMiddleware is that if we call it as a function it will act as
        function call to the next middleware provided in the chain
    */
    console.log('I am the standard express2');
    responseObject.send('<h1>Hello Page</h1>');
}

/* So, middleware3 and standardExpressCallback2 will be used only when /hello route is accessed */
app.get('/hello', middleware3, standardExpressCallback2);

/* This middleware in used in route '/hello' */
function middleware3(req, res, next) {
    console.log('I am a middleware3');
    next();
}

/* We are passing res,req,next in all functions because that's how express works and provide us
    these three parameters */
function middleware1(req, res, next) {
    console.log('I am a middleware1');
    next();
}

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
    /* The purpose of nextMiddleware is that if we call it as a function it will act as
        function call to the next middleware provided in the chain
    */
    console.log('I am the standard express');
    responseObject.send('<h1>Hello World</h1>');
}

/* Here we are specifying the middlewares to be used when route '/' is accessed.
    So, these are route specific middlewares.
*/
app.get('/', middleware1, standardExpressCallback);


app.listen(3000);