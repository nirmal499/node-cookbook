/* The pipeline() method can also be used in Promise form, using the
util.promisify() utility method. The util.promisify() method is used to
convert a callback-style method into Promise form. To use this method, we pass the
method we wish to promisify as an argument. */

const fs = require("fs");
const stream = require("stream");
const util = require("util");
const stat = util.promisify(fs.stat);

const pipeline = util.promisify(stream.pipeline);

const uppercase = new stream.Transform({
    transform(chunk, encoding, callback) {
        // Data processing
        callback(null, chunk.toString().toUpperCase());
    },
});


async function run() {
    await pipeline(
        fs.createReadStream("./file.txt"),
        uppercase,
        fs.createWriteStream("./newFile.txt")
    );
    console.log("Pipeline succeeded.");
}

run().catch((err) => {
    console.error("Pipeline failed", err);
})