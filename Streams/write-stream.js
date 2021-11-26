/* Streams provide a mechanism to sequentially read input and write output. 
By reading chunks of data sequentially, we can work with very large files (or other data
input) that would generally be too large to read into memory and process as a whole.
Streams are fundamental to big data applications or media streaming services, where
the data is too large to consume at once */
const fs = require("fs");
const file = fs.createWriteStream("./test-file.txt");

for (let i = 0; i <= 10000; i++) {
    file.write("Node.js is a JavaScript runtime built on Google Chrome's V8 JavaScript engine.\n");
}


