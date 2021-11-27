/* we've set up a simple SMTP server, we should try sending an email to it via Node.js.
To send an email with Node.js, we can use the nodemailer npm module */

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 4321,
});

const mailOptions = {
    from: "beth@example.com",
    to: "laddie@example.com",
    subject: "Hello",
    text: "Hello world!",
}

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
    }
    console.log("Message Sent:", info);
}
);