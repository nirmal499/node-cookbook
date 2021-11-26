const { Readable } = require("stream");

/* Define the asynchronous generator function .
    Note the use of the function* syntax. This syntax defines a generator function. */
async function* generate() {
    yield "Node.js";
    yield "is";
    yield "a";
    yield "JavaScript";
    yield "Runtime";
}

/* This method is used to construct readable streams with iterators */
/* Create the readable stream using the Readable.from() method, passing our
generate() function as the argument */
const readable = Readable.from(generate());

/* To output the content of our readable stream, register a data event handler that
prints the chunks */
readable.on("data", (chunk) => {
    console.log(chunk);
});