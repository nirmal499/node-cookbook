const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const router = require("koa-router")();
const index = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = new Koa();


/* The koa-static module returns a Koa.js middleware function that we pass to
app.use(). The koa-static module attempts to locate files at the path supplied.
The middleware will then create a write stream from the file and stream it to the request
object. If no file is found, then control is passed on to the next middleware */
app.use(serve(path.join(__dirname, "public")));

/* The other middleware we installed and used was the koa-router middleware. This is
similar conceptually to the Router functionality in Express.js. We call router.use()
to register additional router instances to our main router instance defined in app.js.
We can use router.use() to define mount points. We pass our main router instance
to app.use() to instruct Koa.js to use it as a middleware */
router.use("/", index.routes());
app.use(router.routes());


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
