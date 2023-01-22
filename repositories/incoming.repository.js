const { connect, disconnect } = require("../config/db.config");
const { Incoming } = require("../models/incoming.model");
const logger = require("../logger/api.logger");

class IncomingRepository {
  constructor() {
    connect();
  }

  async getIncoming(month) {
    let data = {};
    try {
      month
        ? (data = await Incoming.find({
            $expr: { $eq: [{ $month: "$dueDate" }, month] },
          }))
        : (data = await Incoming.find({}));
    } catch (err) {
      logger.error("Error::" + err);
      return err.message;
    }
    return data;
  }

  async createIncoming(incoming) {
    let data = {};
    try {
      data = await Incoming.create(incoming);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateIncoming(id, incoming) {
    let data = {};
    try {
      data = await Incoming.updateOne(id, incoming);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteIncoming(incomingId) {
    let data = {};
    try {
      data = await Incoming.deleteOne({ _id: incomingId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new IncomingRepository();
