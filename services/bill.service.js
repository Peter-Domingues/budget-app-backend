const spendingRepository = require("../repositories/bill.repository");

class SpendingsService {
  constructor() {}

  async getSpending(month) {
    return await spendingRepository.getSpending(month);
  }
  async getSpendingHistory() {
    return await spendingRepository.getSpendingHistory();
  }

  async createSpending(bill) {
    return await spendingRepository.createSpending(bill);
  }

  async updateSpending(id, bill) {
    return await spendingRepository.updateSpending({ _id: id }, bill);
  }

  async deleteSpending(spendingId) {
    return await spendingRepository.deleteSpending(spendingId);
  }
}

module.exports = new SpendingsService();
