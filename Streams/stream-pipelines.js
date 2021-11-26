/* we can also use the pipeline() method to chain multiple streams together.
Unlike the pipe() method, the pipeline() method also forwards errors, making it
easier to handle errors in the stream flow */

const fs = require("fs");
const { pipeline, Transform } = require("stream");
const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        // Data processing
        callback(null, chunk.toString().toUpperCase());
    },
});

/* The pipeline method expects the first argument to be a readable stream. Our first
argument will be a readable stream that will read the file.txt file, using the
createReadStream() method */
pipeline(
    fs.createReadStream("./file.txt"),
    uppercase,
    fs.createWriteStream("./newFile.txt"),
    (err) => {
        if (err) {
            console.error("Pipeline failed.", err);
        } else {
            console.log("Pipeline succeeded.");
        }
    }
);
/* we need to add our transform stream as the second argument to the
pipeline() method . Then, we can add our writable stream to write the newFile.txt file to the pipeline:*/

/* The arguments we pass the stream's pipeline() method are as follows:
1. source: A source stream from which to read data
2. ...transforms: Any number of transform streams to process data (including 0)
3. destination: A destination stream to write the processed data to
4. callback: The function to be called when the pipeline is complete */
