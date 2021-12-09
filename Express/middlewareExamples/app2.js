const express = require("express");

const app = express();

/* We are passing res,req,next in all functions because that's how express works and provide us
    these three parameters */
function middleware1(req, res, next) {
    console.log('I am a middleware');
}
/* Since we haven't called the next parameter.So, When we visit 
    '/' route then we see a log message 'I am a middleware' in the console terminal
    and the page will keep loading.

    app.get('/', middleware1, standardExpressCallback);

    Here first the middleware1 is called and then since we are not calling next() in
    middleware1 function so, we are not basically calling standardExpressCallback

    If we had done : app.get('/', standardExpressCallback, middleware1);  then there would have been
    no page loading in route '/' since in standardExpressCallback we are sending response using res.send() hence 
    we are returning the data in the Reponse. So, 'I am a middleware' will never be logged in console terminal since 
    middleware1() will never be called
*/

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
    /* The purpose of nextMiddleware is that if we call it as a function it will act as
        function call to the next middleware provided in the chain
    */
    console.log('I am the standard express');
    responseObject.send('<h1>Hello World</h1>');
}


app.get('/', middleware1, standardExpressCallback);
//app.get('/', standardExpressCallback, middleware1);


app.listen(3000);