const { connect, disconnect } = require("../config/db.config");
const { Invoice } = require("../models/invoice.model");
const logger = require("../logger/api.logger");

class SpendingRepository {
  constructor() {
    connect();
  }

  async getSpending(month) {
    let data = {};
    try {
      month
        ? (data = await Invoice.aggregate([
            {
              $match: {
                type: "bill",
                $expr: {
                  $eq: [{ $month: "$dueDate" }, parseInt(month)],
                },
              },
            },

            {
              $group: {
                _id: { type: "bill" },
                result: { $push: "$$ROOT" },
              },
            },

            { $addFields: { Total: { $sum: "$result.amount" } } },
          ]))
        : (data = await Invoice.aggregate([
            {
              $match: {
                type: "bill",
              },
            },
            {
              $group: {
                _id: { type: "bill" },
                result: { $push: "$$ROOT" },
              },
            },
            {
              $addFields: {
                Total: { $sum: "$result.amount" },
              },
            },
          ]));
    } catch (err) {
      logger.error("Error::" + err);
      return err.message;
    }
    return data[0];
  }

  async getSpendingHistory() {
    let data = {};
    try {
      data = await Invoice.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$dueDate" },
              month: { $month: "$dueDate" },
            },
            totalValue: { $sum: "$amount" },
            result: { $push: "$$ROOT" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (err) {
      logger.error("Error::" + err);
      return err.message;
    }
    return data;
  }

  async createSpending(bill) {
    let data = {};
    try {
      data = await Invoice.create(bill);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateSpending(id, bill) {
    let data = {};
    try {
      data = await Invoice.updateOne(id, bill);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteSpending(spendingId) {
    let data = {};
    try {
      data = await Invoice.deleteOne({ _id: spendingId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new SpendingRepository();
