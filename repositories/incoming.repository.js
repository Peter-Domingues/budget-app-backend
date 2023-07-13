const { connect } = require("../config/db.config");
const { Invoice } = require("../models/invoice.model");
const logger = require("../logger/api.logger");

class IncomingRepository {
  constructor() {
    connect();
  }

  async getIncoming(month) {
    let data = {};
    try {
      month
        ? (data = await Invoice.aggregate([
            {
              $match: {
                type: "incoming",
                $expr: {
                  $eq: [{ $month: "$dueDate" }, parseInt(month)],
                },
              },
            },

            {
              $group: {
                _id: { type: "incoming" },
                result: { $push: "$$ROOT" },
              },
            },

            { $addFields: { Total: { $sum: "$result.amount" } } },
          ]))
        : (data = await Invoice.aggregate([
            {
              $match: {
                type: "incoming",
              },
            },
            {
              $group: {
                _id: { type: "incoming" },
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
  async getSpecificHistory(month, year) {
    let data = {};

    try {
      data = await Invoice.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $month: "$dueDate" }, parseInt(month)] },
                { $eq: [{ $year: "$dueDate" }, parseInt(year)] },
              ],
            },
          },
        },

        {
          $group: {
            _id: {
              month: { $month: "$dueDate" },
            },
            result: { $push: "$$ROOT" },
            MonthIncoming: {
              $addToSet: {
                $cond: {
                  if: {
                    $eq: ["$type", "incoming"],
                  },
                  then: { $sum: "$amount" },
                  else: 0,
                },
              },
            },
            MonthSpendings: {
              $addToSet: {
                $cond: {
                  if: {
                    $eq: ["$type", "bill"],
                  },
                  then: { $sum: "$amount" },
                  else: 0,
                },
              },
            },
          },
        },

        {
          $addFields: {
            Total: {
              $subtract: [
                { $sum: "$MonthIncoming" },
                { $sum: "$MonthSpendings" },
              ],
            },
          },
        },
      ]);
    } catch (err) {
      logger.error("Error::" + err);
      return err.message;
    }
    return data[0];
  }

  async getAllHistory() {
    let data = {};

    try {
      data = await Invoice.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$dueDate" },
              month: { $month: "$dueDate" },
            },
            MonthIncoming: {
              $addToSet: {
                $cond: {
                  if: {
                    $eq: ["$type", "incoming"],
                  },
                  then: { $sum: "$amount" },
                  else: 0,
                },
              },
            },
            MonthSpendings: {
              $addToSet: {
                $cond: {
                  if: {
                    $eq: ["$type", "bill"],
                  },
                  then: { $sum: "$amount" },
                  else: 0,
                },
              },
            },
          },
        },
        {
          $group: {
            _id: {
              year: "$_id.year",
            },
            Months: {
              $addToSet: {
                Month: "$_id.month",
                MonthIncoming: { $sum: "$MonthIncoming" },
                MonthSpendings: { $sum: "$MonthSpendings" },
              },
            },
          },
        },
        {
          $addFields: {
            YearProfit: {
              $subtract: [
                { $sum: "$Months.MonthIncoming" },
                { $sum: "$Months.MonthSpendings" },
              ],
            },
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

  async createIncoming(incoming) {
    let data = {};
    try {
      data = await Invoice.create(incoming);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateIncoming(id, incoming) {
    let data = {};
    try {
      data = await Invoice.updateOne(id, incoming);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteIncoming(incomingId) {
    let data = {};
    try {
      data = await Invoice.deleteOne({ _id: incomingId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new IncomingRepository();
