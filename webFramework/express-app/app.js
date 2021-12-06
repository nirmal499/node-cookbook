const express = require("express");
const path = require("path");
const index = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();
/* we'll register the static Express.js middleware to host the public directory. */
app.use(express.static(path.join(__dirname, "public")));
/* The first time we call app.use() in the recipe, we pass it the express.static
method. The express.static method returns a middleware function that attempts
to locate the supplied path. The middleware will create a write stream from the specified
file and stream this to the request object. In the recipe, we use the express.static
function to serve the public directory */

app.use("/", index);
/* In the following use case of app.use(), we pass the string / as the argument and index
where / is the mount point for the middleware and index is the Express.js router that we
defined in routes/index.js.
A mount point is used to restrict requests to that match the mount point, rather than
applying to all incoming requests. The ordering of Express.js middleware is important, as
they execute successively (one after the other). If we were to use app.use() to register
two middlewares against the same mount point, the first would take precedence */

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/* Now we've created an Express.js web server that responds with an HTML page on the / route. */