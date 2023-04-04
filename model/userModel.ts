import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const userSchema = new mongoose.Schema(
  {
    id: String,
    fullName: {
      type: String,
      required: [true, "Please provide your First Fame"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    NID: {
      type: String,
      required: [true, "Please provide your NID Number"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    DOB: {
      type: String,
      required: [true, "Please provide your Date of Birth"],
    },
    role: {
      type: String,
      default: "A/C Holder",
      enum: {
        values: ["Cashier", "Manager", "A/C Holder", "Admin"],
        message: "{VALUE} is not a correct Role for user!",
      },
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value: string) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    cell: {
      type: String,
      required: [true, "Please provide your Cell Number"],
    },
    imgUrl: {
      type: String,
      validator: (value: string) => validator.isURL(value)
    },
    address: {
      type: String,
      required: [true, "Please provide your Address"],
    },
    OTP: {
      type: String,
      required: [true, "OTP is required"],
    },
    status: {
      type: String,
      enum: ["Active A/C", "Inactive A/C", "Guest"],
      default: "Guest",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = function (password:string, hash:string) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const Users = mongoose.model("user", userSchema);

export default Users;
