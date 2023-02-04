const spendingService = require("../services/bill.service");
const logger = require("../logger/api.logger");

class SpendingController {
  async getSpending(month) {
    logger.info("Controller: getSpending");
    return await spendingService.getSpending(month);
  }
  async getSpendingHistory() {
    logger.info("Controller: getSpendingHistory");
    return await spendingService.getSpendingHistory();
  }

  async createSpending(bill) {
    logger.info("Controller: createSpending", bill);
    return await spendingService.createSpending(bill);
  }

  async updateSpending(id, bill) {
    logger.info("Controller: updateSpending", bill);
    return await spendingService.updateSpending(id, bill);
  }

  async deleteSpending(spendingId) {
    logger.info("Controller: deleteSpending", spendingId);
    return await spendingService.deleteSpending(spendingId);
  }
}
module.exports = new SpendingController();
