const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');
const path = require('path');

const { ApiError } = require('../error')
const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD, FRONTEND_URL } = require('../config/config');
const templateInfoObj = require('../email-templates');


const sendMail = async (emailReceiver, emailAction, helpingBoard = {}) => {
  // Створюю новий об'єкт з класа emailTemplates який я витянув як бібліотеку
  // і вказую шлях на шаблони відправки емейлів
  const templateRenderer = new emailTemplates({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  })

  // Динамічне взяття ключа, тому що один раз буде welcome подія,
  // другий раз car-arrived і т.д
  const templateObject = templateInfoObj[emailAction]

  if (!templateObject) {
    throw new ApiError('Template is not found')
  }

  // Змінна FRONTEND_URL ми витягнули з config файлу, де придали її певного значення
  // Ми її з'єднуємо в один об'єкт. Це по суті те що треба до .pug там де ми будемо використовувати
  // цю силку в змінні frontEndUrl
  Object.assign(helpingBoard, { frontEndUrl: FRONTEND_URL })

  const html = await templateRenderer.render(templateObject.emailTemplateName, helpingBoard);

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Сервіс який надсилає почту
    auth: { // Хто надсилає почту
      user: SENDER_EMAIL,
      pass: SENDER_EMAIL_PASSWORD
    }
  })

  await transporter.sendMail({
    from: SENDER_EMAIL, // Від кого пошта
    to: emailReceiver, // До кого пошта
    subject: templateObject.subject, // Заголовок почти
    html // Вміст почти
  })
};


module.exports = {
  sendMail
};
