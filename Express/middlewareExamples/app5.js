const express = require("express");

const app = express();

function middleware(req, res, next) {
    console.log('I am the middleware');
    /* Here we might have any database call and here do a catching errors that happen
    with database something that we cannot control. So we catch the error and pass it 
    to the next();
    */
    const errObj = new Error('I am an error');
    next(errObj);
}

function errorHandler(err, req, res, next) {
    /* If we do not catch the error then server will be down forever .So we
    to catch errors gracefully
    */
    if (err) {
        res.send('<h1>There was an error, please try again</h1>')
    }
}

app.use(middleware);
app.use(errorHandler);

/* If we have done 

app.use(errorHandler);
app.use(middleware);

then error would have crashed our server.

*/

app.get('/', (req, res, next) => {
    console.log('I am the standard express');
    res.send('<h1>Hello World</h1>');
});


app.listen(3000);