/* SMTP stands for Simple Mail Transfer Protocol and is a protocol for sending emails. In
this recipe, we will be setting up an SMTP server using a third-party npm module named
smtp-server. */
/* we will be creating an SMTP server that can receive email messages */

const SMTPServer = require("smtp-server").SMTPServer;
const PORT = 4321;

/* In this recipe, we added the disabledCommands: ['STARTTLS', 'AUTH']
option. This option disabled Transport Layer Security (TLS) support and authentication
for simplicity. However, in production, it would not be recommended to disable TLS
support and authentication. Instead, it would be recommended to enforce TLS. You can
do this with the smtp-server module by specifying the secure:true option */
/* Should you wish to enforce TLS for the connection, you would also need to define a
private key and a certificate. If no certificate is provided, then the module will generate
a self-signed certificate; however, many clients reject these certificates. */
const server = new SMTPServer({
    disabledCommands: ["STARTTLS", "AUTH"],
    logger: true,
});

server.on("error", (err) => {
    console.error(err);
});

server.listen(PORT);