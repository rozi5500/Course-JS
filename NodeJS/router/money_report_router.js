const {Router} = require('express');

const reportController = require('../controller/money_report_controller');

const reportRouter = Router();

reportRouter.get('/', reportController.getSpentMoney);

reportRouter.post('/', reportController.createField);

reportRouter.get('/:FieldId', reportController.getOneField);

reportRouter.delete('/:FieldId', reportController.deleteField);

module.exports = reportRouter;