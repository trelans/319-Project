var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'toeraapp@gmail.com',
        pass: 'ecrtrvxuuybmdpcq'
    }
});

var mailOptions = {
    from: 'toeraapp@gmail.com',
    to: 'oktay.gultekin@ug.bilkent.edu.tr',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

module.exports = {
    transporter
}