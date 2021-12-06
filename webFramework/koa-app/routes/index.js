const router = require("koa-router")();

/* Our anonymous async function has one argument ctx. ctx is the Context object. The
Context object is created per request and combines the request and response objects
provided by Node.js. In the recipe, our async function returns a simple HTML page */
router.get("/", async function (ctx) {
    const title = "Koa.js";
    ctx.body = `
        <html>
        <head>
        <title> ${title} </title>
        <link rel="stylesheet" href="styles.css"></head>
        <body>
        <h1> ${title} </h1>
        <p> Welcome to ${title} </p>
        </body>
        </html>
    `;
});

module.exports = router;