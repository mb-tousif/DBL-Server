import { RequestHandler } from "express";
import { delTransaction, getTransactions, transaction, updateBalance } from "../service/transactionService";
import Users from "../model/userModel";

// Get all Transactions
export const getAllTransaction: RequestHandler = async (req, res) => {
    try {
      const transactions = await getTransactions();
      if(transactions.length == 0){
        return res.status(404).json({
          status: "fail 💥",
          message: "No Transaction found 🕳️",
        });
      }
      res.status(200).json({
        status: "success 🎉",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail 💥",
        message: "Did not find any Transaction 🕳️",
      });
    }
  };

  // Post Transaction
export const postTransaction: RequestHandler = async (req, res) => {
  try {
    const info = req.body;
    const result = await transaction(info);
    await result.save();
    await Users.updateOne( 
      { _id: result.user },
      { $push: { transaction: result._id } }
    );
    res.status(200).json({
      status: "success 🎉",
      message: "Transaction saved in DB successfully📣.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail 💥",
      message: "Transaction did not save 📣.",
    });
  }
};

// Update Transaction
export const updateTransaction:RequestHandler = async (req, res)=>{
  try {
    const id = req.params.id;
    const balance = req.body;
    const result = await updateBalance(id, balance);
    res.status(200).json({
      status: "success 🎉",
      data: result,
    });;
  } catch (error) {
    res.status(500).json({
      status: "fail 💥",
      message: "Transaction did not Updated 📣.",
    });
  }
};

// Delete API
export const deleteTransaction:RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await delTransaction(id);
    res.status(200).json({
      status: "success 🎉",
      message: "Transaction deleted from DB successfully📣.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail 💥",
      message: "Transaction did not delete 📣.",
    });
  }
};