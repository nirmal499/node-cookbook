/* A Node.js stream can be in either flowing or paused mode. In flowing mode, data chunks
are read automatically, whereas in paused mode, the stream.read() method must be
called to read the chunks of data */

const fs = require("fs");
const rs = fs.createReadStream("./test-file.txt");

/* we need to register a readable event handler on the readable stream:
    Here we interact with a readable stream that is in paused mode, which is its default upon creation
*/
rs.on("readable", () => {
    let data = rs.read();
    while (data !== null) {
        //console.log("Read chunk:", data);
        console.log("Read chunk:", data.toString());
        data = rs.read();
    }
});

rs.on("end", () => {
    console.log("No more data.");
});