import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
      html,
    }

    await transporter.sendMail(mailOptions)

    return {success: true, message: 'OTP sent to your email',}

  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, message: error.message }
  }
}

export default sendEmail