const nodemailer = require('nodemailer')
const mailer = require('../../config/mailer')

exports.send = (recipient, subject, body) => {
  let transporter = nodemailer.createTransport(mailer.smtp)
  let mailOptions = {
    from: mailer.from,
    to: recipient,
    subject: subject,
    html: body
  }
  transporter.sendMail(mailOptions)
    .then(() => console.log('mail was sent successfully'))
    .catch(() => console.error('mail was not sent successfully'))
}
