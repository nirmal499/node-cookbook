const fs = require("fs");
const http = require("http");
const path = require("path");
const form = fs.readFileSync(path.join(__dirname, "public", "form.html"));
const formidable = require("formidable");

const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        get(res);
        return;
    }
    if (req.method === "POST") {
        post(req, res);
        return;
    }
    error(405, res);
}).listen(PORT, HOSTNAME, () => {
    console.log(`Server listening on port ${server.address().port}`);
});


function get(res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(form);
}

function post(req, res) {
    /* The post() function checks that the Content-Type header is set to multipart/
        form-data. If this header isn't set, we call our error function and return a 415 HTTP
        status code with the message Unsupported Media Type */
    if (!/multipart\/form-data/.test(req.headers["content-type"])) {
        error(415, res);
        return;
    }

    /* Within the post() function, we initialized a formidable object with configuration
        options and assigned it to a constant named form. The first configuration option,
        multiples:true, instructs formidable to handle multiple files being uploaded. The
        second, uploadDir:"./uploads", instructs formidable where the uploaded files
        should be stored, and in the case of our recipe, we set this to the uploads directory */
    const form = formidable({
        multiples: true,
        uploadDir: "./uploads",
        //maxFileSize: 50 * 1024 * 1024, // 5MB,Default is 200MB
    });

    /* Next, we call the form.parse() function. This function parses the request and collects
        the form data within the request. The parsed form data is passed to our callback function,
        as an array of fields and an array of files.
        Within our form.parse() callback function, we first check if any errors occurred
        during the form.parse() function, and return an error if there was one. Assuming
        the form data was successfully parsed, we return our response to the request, which is
        an HTTP status code 200, OK. We also return the information formidable provides
        by default about our uploaded file, in a string representation of the JSON format */
    form.parse(req, (err, fields, files) => {
        if (err) return err;
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        //console.log(files.userfile.filepath);
        renameFiles(files);
        res.end(JSON.stringify({ fields, files }));
    });
}

function renameFiles(files) {
    // let tempPath = files.userfile.filepath;
    // let newPath = __dirname + "/uploads/" + files.userfile.originalFilename;
    // fs.rename(tempPath, newPath, (err) => {
    //     if (err) throw err;
    // })

    for (let i = 0; i < files.userfile.length; i++) {
        let tempPath = files.userfile[i].filepath;
        let newPath = __dirname + "/uploads/" + files.userfile[i].originalFilename;
        fs.rename(tempPath, newPath, (err) => {
            if (err) throw err;
        })
    }
}

function error(code, res) {
    res.statusCode = code;
    res.end(http.STATUS_CODES[code]);
}