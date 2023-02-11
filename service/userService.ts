import Users from "../model/userModel";

interface SignupData {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const signupService = async (userInfo:SignupData) => {
  const result = await Users.create(userInfo);
  return result;
};

export const findUserByEmail = async (email:string) => {
  return await Users.findOne({ email });
};

export const getUsers = async () => {
  const result = await Users.find({});
  return result;
};
