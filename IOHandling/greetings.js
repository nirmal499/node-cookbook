/* listen for user input */
process.stdin.on("data", (data) => {
    /* processing on each data event */
    const name = data.toString().trim().toUpperCase();
    if (name !== "") {
        /* check for whether the input string is empty, and log to STDERR if it is.  */
        process.stdout.write(`Hello ${name}`);
    } else {
        process.stderr.write("Input was empty\n");
    }
})