const incomingRepository = require("../repositories/incoming.repository");

class IncomingsService {
  constructor() {}

  async getIncoming(month) {
    return await incomingRepository.getIncoming(month);
  }
  async getAllHistory() {
    return await incomingRepository.getAllHistory();
  }

  async createIncoming(incoming) {
    return await incomingRepository.createIncoming(incoming);
  }

  async updateIncoming(id, incoming) {
    return await incomingRepository.updateIncoming({ _id: id }, incoming);
  }

  async deleteIncoming(incomingId) {
    return await incomingRepository.deleteIncoming(incomingId);
  }
}

module.exports = new IncomingsService();
