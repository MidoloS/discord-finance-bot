import { User } from "../models/Users.js";
import { paymentTable, debtTable, useCommand, addPayments } from "./helper.js";

export const pay = async (message) => {
  const {
    content,
    author: { username, id: discordId },
  } = message;
  const { args } = useCommand(content);
  const payment = { date: new Date(), amount: addPayments(args) };
  const found = await User.find({ discordId }).exec();
  if (found.length === 0) {
    await User.create({
      username,
      discordId,
      payments: [payment],
    });
  } else {
    const res = await User.findOneAndUpdate(
      { discordId },
      {
        $push: {
          payments: payment,
        },
      }
    );
  }
  message.reply(paymentTable({args, username}));
};

export const debt = async (message) => {
  const {
    author: { id: discordId },
  } = message;
  const found = await User.find({ discordId }).exec();
  if (found.length === 0) {
    message.reply(`Sin pagos`);
  } else {
    message.reply(debtTable(found[0]));
  }
};
