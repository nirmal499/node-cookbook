const fs = require("fs");
const rs = fs.createReadStream("test-file.txt");

/* Readable streams are asynchronous iterables. This means we can use the for
await...of syntax to loop over the stream data */
async function run() {
    for await (const chunk of rs) {
        console.log("Read chunk: ", chunk);
    }
    console.log("No more data");
}

run();

