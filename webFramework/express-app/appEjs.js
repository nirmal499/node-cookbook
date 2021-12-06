const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const index = require("./routes/indexEjs");
const logger = require("./middleware/logger");

const PORT = process.env.PORT || 3000;

const app = express();


/* app.set() can be used to alter settings used internally by Express. The first app.
set() command sets the views namespace to our views folder. Express defaults
to looking for views in this location; however, we have specified it to be explicit.
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/* The second app.set() command sets the view engine, and in our case, we set it
to use the EJS view engine. Note that we do not need to import the ejs module,
as Express handles this for us.  */

app.use(logger());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

/* we'll register the static Express.js middleware to host the public directory. */
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});