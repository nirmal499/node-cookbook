const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./test-file.txt");
const newFile = fs.createWriteStream("./test-new-file.txt");

class Uppercase extends TransformStream {
    constructor() {
        super();
    }

    /* we're overriding the _transform() method with our transformation logic. */
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

rs.pipe(new Uppercase()).pipe(newFile);