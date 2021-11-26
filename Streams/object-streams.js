const { Transform } = require("stream");
const { stringify } = require("ndjson");

const Name = new Transform({
    objectMode: true,
    transform: ({ forename, surname }, encoding, callback) => {
        callback(null, { name: forename + " " + surname });
    },
});

/* we can create our chain of streams. We will pipe the Name transform
stream to the stringify() method (from ndjson), and then pipe the
result to process.stdout */
Name.pipe(stringify()).pipe(process.stdout);
/* The stringify() function converts the streamed JSON objects into
newline-delimited JSON. The stringify() stream is a transform stream where the
writable side is in object mode, but the readable side is not */

Name.write({ forename: "John", surname: "Doe" });
Name.write({ forename: "Jane", surname: "Doe" });