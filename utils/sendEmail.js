const nodeMailer = require('nodemailer');
const config = require('config');

module.exports = async (to,subject,content) => {
    const transporter = nodeMailer.createTransport({
        service: config.get('emailSmtpService'),
        host: config.get('emailSmtpHost'),
        port: config.get('emailSmtpPort'),
        secure: true,
        auth: {
            user: config.get('emailUser'),
            pass: config.get('emailPassword')
        }
    });

    const mailOptions = {
        from: config.get('emailUser'),
        to: to,
        subject: subject,
        html: content
    };

    await transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        }
    });
};