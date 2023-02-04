const incomingService = require("../services/incoming.service");
const logger = require("../logger/api.logger");

class IncomingController {
  async getIncoming(month) {
    logger.info("Controller: getIncoming");
    return await incomingService.getIncoming(month);
  }
  async getAllHistory() {
    logger.info("Controller: getAllHistory");
    return await incomingService.getAllHistory();
  }

  async createIncoming(incoming) {
    logger.info("Controller: createIncoming", incoming);
    return await incomingService.createIncoming(incoming);
  }

  async updateIncoming(id, incoming) {
    logger.info("Controller: updateIncoming", incoming);
    return await incomingService.updateIncoming(id, incoming);
  }

  async deleteIncoming(incomingId) {
    logger.info("Controller: deleteIncoming", incomingId);
    return await incomingService.deleteIncoming(incomingId);
  }
}
module.exports = new IncomingController();
