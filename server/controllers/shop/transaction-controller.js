import TransactionSchema from "../../models/transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { userId, orderId, transactionToken } = req.body;

    const newTransaction = new TransactionSchema({
      userId,
      orderId,
      transactionToken,
    });
    await newTransaction.save();
    return res.status(200).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getTransactionByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await TransactionSchema.find({ userId });

    if (!transactions.length) {
      return res.status(400).json({
        success: true,
        message: "transaction not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
