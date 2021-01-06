import { updateJsxSpreadAttribute } from "typescript";
import { getUserFromMention, log } from "../../utils/index";
import { User } from "../database/user/user";

export const penisCommand = (discordBot, message, args) => {
  const userDb = new User();
  const length = Math.floor(Math.random() * 24);

  const user = userDb.createUser(message, length);

  if (args[0]) {
    const user = getUserFromMention(args[0], discordBot);
    if (!user) return message.reply("User not found");
    const mentionUser = userDb.createUserFromMention(
      user.id,
      user.username,
      length
    );
    message.channel.send(
      `<@${mentionUser.id}> penis size is ***` +
        mentionUser.length.toString() +
        " inches***"
    );
  } else {
    message.reply(
      "your penis size is ***" + user.length.toString() + " inches***"
    );
  }

  const channelType = message.channel.name ?? "private message";

  log(
    "[BerdBot] - " +
      message.author.username +
      " used command penis in " +
      channelType +
      " channel",
    "lightblue"
  );
};

export const pingCommand = async (message, args) => {
  try {
    message.reply("Pong!");
    const channelType = message.channel.name ?? "private message";

    log(
      "[BerdBot] - " +
        message.author.username +
        " used command ping in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const slapCommand = (discordBot, message, args) => {
  const length = Math.floor(Math.random() * 100);

  if (length >= 0 && length < 80) {
    if (args[0]) {
      const user = getUserFromMention(args[0], discordBot);
      if (!user) return message.reply("User not found");
      message.channel.send(`<@${user.id}> was slapped :clap:`);
    } else {
      message.reply("You can't slap yourself");
    }
  } else if (length >= 80 && length <= 100) {
    message.reply("You were confused and slapped yourself");
  }

  const channelType = message.channel.name ?? "private message";

  log(
    "[BerdBot] - " +
      message.author.username +
      " used command slap in " +
      channelType +
      " channel",
    "lightblue"
  );
};

export const resetLength = (message) => {
  if (message.author.id === "254141160895938560") {
    const userDb = new User();
    userDb.deleteUser(message.author.id);
    message.reply("[RESET] Successfully resetted your length");
  }
  message.reply("[ERROR] You dont have permission to use this command");
};
