const express = require("express");

const app = express();

/* This is a global middleware, so it is going to be used in all the routes.
    It is not specific to only one route
*/
app.use(middleware1);
app.use(middleware2);
/* Order is very important here

app.use(middleware2);
app.use(middleware1);

we would have got 
I am the middleware #2
I am the middleware #1

in the console terminal
*/

function middleware1(req, res, next) {
    console.log('I am the middleware #1');
    next();
}

function middleware2(req, res, next) {
    console.log('I am the middleware #2');
    next();
}

function middleware3(req, res, next) {
    console.log('I am the middleware #3');
    next();
}

app.get('/', middleware3, (req, res, next) => {
    console.log('I am the standard express');
    res.send('<h1>Hello World</h1>');
});


app.listen(3000);