const nodemailer = require("nodemailer");

require('dotenv').config();
const companyEmail = process.env.companyEmail;
const emailPassKey = process.env.emailPassKey;

const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: companyEmail,
        pass: emailPassKey,
    },
});
 
async function sendEmail(entityName,userEmail, userName, password) {
    try {
        const info = await transporter.sendMail({
            from: `"Aironex Private Ltd" <${companyEmail}>`,
            to: userEmail,
            subject: "Registration Successful!",
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Aironex!</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                    text-align: center;
                }

                p {
                    margin-bottom: 20px;
                }

                .entityName {
                    color: #ff5733; /* Orange color */
                }

                .userName,
                .password{
                  color:red
                }
                .companyName {
                    color: #0066ff; /* Blue color */
                }

                .signature {
                    font-style: italic;
                    font-size: 14px;
                    color: brown;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Aironex!</h1>
                <p>Hi <strong class="entityName">${entityName}</strong>,</p>
                <p>Thanks for registering with our company. Your username is <strong class="userName">${userName}</strong> and password is <strong class="password">${password}</strong>.</p>
                <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
                <div class="signature">
                    <p>Thanks and Regards,</p>
                    <p class="companyName">Aironex Private Limited</p>
                    <p>Kolkata, West Bengal, India</p>
                    <p>Mob.: 8250180000</p>
                </div>
            </div>
        </body>
        </html>
      `,
        });

    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

// sendEmail("email@gmail.com", "entityName", "userName", "password123");



module.exports = {
    sendEmail    
}
