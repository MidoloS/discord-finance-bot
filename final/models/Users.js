import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  date: Date,
  amount: Number,
});

const UserSchema = new Schema({
  discordId: String,
  username: String,
  payments: [PaymentSchema],
});

export const User = mongoose.model("UserModel", UserSchema);