const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "test-hello.txt");

/* The asynchronous version of readFileSync() is readFile(). The general convention
is that synchronous APIs will have the term "sync" appended to their name. The
asynchronous function requires a callback function to be passed to it. The callback function
contains the code that we want to be executed when the asynchronous function completes */

fs.readFile(filepath, "utf8", (err, contents) => {
    if (err) {
        return console.log(err);
    }
    console.log("File Contents: ", contents);
    const upperContents = contents.toUpperCase();

    /*  adding a delay of 5s between the reading and writing of the file */
    setTimeout(() => updateFile(filepath, upperContents), 5000);

});

function updateFile(filepath, upperContents) {
    console.log("Uppercase File Contents: ", upperContents);
    fs.writeFile(filepath, upperContents, (err) => {
        if (err) throw err;
        console.log("File Updated");
    });
}

/* Observe that the string continues to be printed every 1s, even in between
when the file is being read and rewritten. This shows that the file reading and
writing have been implemented in a non-blocking manner because operations
are still completing while the file is being handled */
setInterval(() => process.stdout.write("**** \n"), 1000).unref();