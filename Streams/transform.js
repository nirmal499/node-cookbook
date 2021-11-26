const fs = require("fs");
const { Transform } = require("stream");

/* Create a readable stream to read the file.txt file */
const rs = fs.createReadStream("./test-file.txt");

/* Once our file content has been processed by our transform stream, we will write
it to a new file named newFile.txt. Create a writable stream to write this file
using the createWriteStream() method: */
const newFile = fs.createWriteStream("./test-new-file.txt");

/* we need to start to define our transform stream. We'll name our transform
stream uppercase() */
const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        /* This calls the transform stream callback function with the transformed chunk. */
        callback(null, chunk.toString().toUpperCase());
    }
})

rs.pipe(uppercase).pipe(newFile);
