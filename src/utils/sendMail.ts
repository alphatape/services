import * as nodemailer from 'nodemailer';

export default function sendMail(otp, receiverEmail) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jaiswarsandeep119@gmail.com',
      pass: 'rquwxexhkgerwtph',
    },
  });

  let mailDetails = {
    from: 'jaiswarsandeep119@gmail.com',
    to: `${receiverEmail}`,
    subject: 'assisting to login with email securely',
    text: `One Time Password for Alphatape is ${otp}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent successfully');
    }
  });
}