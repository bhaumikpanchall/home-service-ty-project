const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "quickfix.info.00@gmail.com",
        pass: "nhfabsmizpszlmmz",
    },
});

const sendMail = (receiverEmail, subject, body) => {

    let mailOptions = {
        from: "quickfix.info.00@gmail.com",
        to: receiverEmail, //  email receiver
        subject: subject,
        text: body,
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs', err);
        }
    });
}

module.exports = {
    sendMail
}

