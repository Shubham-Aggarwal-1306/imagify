const { MailtrapClient } = require("mailtrap");
exports.sendEmail = async (options) => {

    const TOKEN = process.env.SMTP_PASSWORD;
    const ENDPOINT = process.env.SMTP_ENDPOINT;

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: process.env.SMTP_EMAIL,
        name: process.env.FROM_NAME,
    };
    const recipients = [
        {
            email: options.email,
        }
    ];

    await client
        .send({
            from: sender,
            to: recipients,
            subject: options.subject,
            text: options.message,
        })
        .then(console.log, console.error);
};

