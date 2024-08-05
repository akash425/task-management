require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email password or an app-specific password
    }
});

// Set up email data

// var transporter = nodemailer.createTransport({
//     host: "live.smtp.mailtrap.io",
//     port: 587,
//     auth: {
//         user: "api",
//         pass: "f9325267cf3502eefea1142a9aa75d23"
//     }
// });


exports.sendMail = async (email, taskTitle) => {
    let mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: email, // List of recipients
        subject: 'New Task Assignment',
        text: `You have been assigned a new task: ${taskTitle}`,
        html: `<strong>You have been assigned a new task:</strong> ${taskTitle}`
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
