import Transactions from "../model/transactionModel";

interface TransactionData {
  type: string;
  amount: number;
  name: string;
}

export const transaction = async (info: TransactionData) => {
  const result = await Transactions.create(info);
  return result;
};

export const getTransactions = async () => {
  const result =
  await Transactions.find({})
  .populate("user", "fullName email NID");
  return result;
};


export const updateBalance = async ( id:string, balance:{}) => {
  const result = await Transactions.updateOne({_id: id},{$set: balance});
  return result;
};

export const delTransaction = async ( id:string) => {
  const result = await Transactions.deleteOne({_id: id});
  return result;
};
