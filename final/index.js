import Discord from "discord.js";
import mongoose from "mongoose";

import { debt, pay } from "./helpers/commands.js";
import { useCommand, PREFIX } from "./helpers/helper.js";
import { BOT_TOKEN } from "./config.js";

const uri = "mongodb://localhost:27017/discord-bot";
const client = new Discord.Client();
const db = mongoose.connection;

// Middleware
client.login(BOT_TOKEN);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((err) => console.error(err));

db.once("open", () => {
  console.log("DB OPEN", uri);
});
db.on("error", (err) => console.error(err));

const main = () => {
  try {
    client.on("message", (message) => {
      const { content } = message;
      const { command } = useCommand(content);

      if (!content.startsWith(PREFIX)) return;

      commands[command](message);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

const commands = {
  debt,
  pay,
};
