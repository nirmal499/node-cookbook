const router = require("koa-router")();

router.get("/", async function (ctx, next) {
    /* The template is populated with the values set on ctx.state, in this case, the title
        value. koa-views automatically inspects ctx.state for template values. */
    ctx.state = {
        title: "Koa.js",
    };
    /* Here index refers to the index.ejs */
    await ctx.render("index");
    /* We pass the render() function the name of
    the template we wish to use. The koa-views middleware knows to search our views
    directory for the template as we have configured the template location in app.js */
});

module.exports = router;