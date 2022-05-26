const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');
const path = require('path');

const { ApiError } = require('../error')
const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD, FRONTEND_URL } = require('../config/config');
const templateInfoObj = require('../email-templates');


const sendMail = async (emailReceiver, emailAction, helpingBoard = {}) => {
  const templateRenderer = new emailTemplates({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  })

  const templateObject = templateInfoObj[emailAction]

  if (!templateObject) {
    throw new ApiError('Template is not found')
  }

  Object.assign(helpingBoard, { frontEndUrl: FRONTEND_URL })

  const html = await templateRenderer.render(templateObject.emailTemplateName, helpingBoard);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_EMAIL_PASSWORD
    }
  })

  await transporter.sendMail({
    from: 'no-reply',
    to: emailReceiver,
    subject: templateObject.subject,
    html
  })
};


module.exports = {
  sendMail
};
