import express from 'express'; // Use 'import' instead of 'require'
import nodemailer from 'nodemailer'; // Use 'import' instead of 'require'
import cors from 'cors'; 
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",  // Corrected this line
    port: 587,
    secure: false,  // true for 465, false for other ports
    auth: {
       user: 'nairsddhrth@gmail.com',
        pass: 'vvgr opxo jzij ehfe ',
    },
});

app.post('/send-email', (req, res) => {
    const { to, bookName } = req.body;
    console.log(to, bookName);
    console.log(`Sending email to: ${to}, for book: ${bookName}`);

    const mailOptions = {
        from: 'nairsddhrth@gmail.com',
        to: to,
        subject: 'Book Arrival Notification',
        text: `Your book "${bookName}" has arrived at the library. You can pick it up now!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);  // Logging the error
            return res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);  // Logging success response
            res.status(200).send('Email sent successfully');
        }
    });
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});
