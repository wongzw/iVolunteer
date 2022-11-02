const nodemailer = require("nodemailer");
const smtpConfig = require("smtpConfig.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpConfig["smtp-username"],
    pass: smtpConfig["smtp-password"],
  },
});

function mailOptions(emailRecipient, subject, message) {
  const mailOptions = {
    from: smtpConfig["smtp-username"],
    to: emailRecipient,
    subject: subject,
    text: message,
  };
}

// Call This Function
function sendMail(emailRecipient, subject, message) {
  const mailDetail = mailOptions(emailRecipient, subject, message);
  transporter.sendMail(mailDetail, function (error, info) {
    if (error) {
      return false;
    } else {
      return info.response;
    }
  });
}
