const express = require("express");
const router = express.Router();

/* Routing determines how an application responds to a request at a given endpoint.
Typically, an endpoint is expressed by a URI (that is, a path) and the HTTP request
method. Express's Router object exposes methods that we can use to create endpoints
in our application. We used the router.get() method to expose
an endpoint that is accessed via an HTTP GET request */


router.get("/", (req, res) => {
    const title = "Express";
    /* Here index refers to the index.ejs */
    res.render("index", {
        title: "Express with EJS",
    });
});

/* The route will handle an optional name parameter: */
router.get("/:name?", function (req, res) {
    const title = "Express";
    const name = req.params.name;
    res.send(`
    <html>
    <head>
    <title> ${title} </title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <h1> ${title} </h1>
    <p> Welcome to ${title}${name ? `, ${name}.` : ""} </p>
    <form method=POST action=data>
    Name: <input name=name><input type=submit>
    </form>
    </body>
    </html>
    `);
});

router.post("/data", function (req, res) {
    res.redirect(`/${req.body.name}`);
});

module.exports = router;