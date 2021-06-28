import Discord from "discord.js";

export const formatDate = (date) =>
  new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");

export const addPayments = (payments = []) =>
  payments.reduce((acc, payment) => acc + Number(payment), 0);

export const debtTable = ({ username, payments }) => {
  const table = new Discord.MessageEmbed();

  table
    .setColor("#0099ff")
    .setThumbnail("https://i.ibb.co/nDZT3Gg/coin-removebg-preview.png")
    .setAuthor(username)
    .addFields(
      {
        name: "Fecha",
        value: payments.reduce(
          (acc, { date }) => `${acc} ${formatDate(date)}\n`,
          ""
        ),
        inline: true,
      },
      {
        name: "Cantidad",
        value: payments.reduce((acc, { amount }) => `${acc} ${amount}$\n`, ""),
        inline: true,
      }
    );

  return table;
};

export const paymentTable = ({ args, username }) => {
  const table = new Discord.MessageEmbed();

  table
    .setColor("#0099ff")
    .setThumbnail("https://i.ibb.co/nDZT3Gg/coin-removebg-preview.png")
    .setAuthor(username)
    .addFields(
      {
        name: "Pago/s",
        value: args.join("$\n") + "$",
        inline: true,
      },
      {
        name: "Total",
        value: addPayments(args),
        inline: true,
      }
    );

  return table;
};

export const PREFIX = "/";

export const useCommand = (content) => {
  const commandBody = content.slice(PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  return { command, args };
};
