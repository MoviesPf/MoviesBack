const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const sendEmail = asyncHandler(async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'moviespf123@gmail.com',
        pass: 'pqbrhpzefzrbfrmn'
      }
    },
    );
    
    const info = await transporter.sendMail({
      to: data.to,
      subject: data.subject,
      html: data.html
    },
    )
    console.log('hola entraste')

  } catch (error) {
    throw Error(error.message)
  }
});

module.exports = sendEmail;
