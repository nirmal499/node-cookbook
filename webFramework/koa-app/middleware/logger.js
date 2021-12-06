module.exports = logger;

function logger() {
    return async (ctx, next) => {
        console.log("Request received:", ctx.req.method, ctx.req.url);
        await next();
        /* The call to await.next() delegates execution to subsequent middleware. See details.txt */
    };
}