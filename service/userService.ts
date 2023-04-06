import Users from "../model/userModel";

interface SignupData {
  fullName: string;
  NID: string;
  email: string;
  DOB: string;
  role: string;
  password: string;
  cell: string;
  imgUrl: string;
  address: string;
  OTP: string;
}

export const generateOTP= ()=> {
  let OTP = '';
  for (let i = 0; i < 5; i++) {
      OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}

export const signupService = async (userInfo:SignupData) => {
  const result = await Users.create(userInfo);
  return result;
};

export const findUserByEmail = async (email:string) => {
  return await Users.findOne({ email })
  .populate("transaction", "type balance name");
};

export const getUsers = async () => {
  const result = await Users.find({})
  .populate("transaction", "type amount -_id")
  return result;
};
