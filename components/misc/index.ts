import { getUserFromMention, log } from "../../utils/index";

export const penisCommand = (discordBot, message, args) => {
  const length = Math.floor(Math.random() * 24);

  if (args[0]) {
    const user = getUserFromMention(args[0], discordBot);
    if (!user) return message.reply("User not found");
    message.channel.send(
      `<@${user.id}> penis size is ***` + length.toString() + " inches***"
    );
  } else {
    message.reply("your penis size is ***" + length.toString() + " inches***");
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

const systemPing = (host, message) => {
  try {
    var exec = require("child_process").exec;

    const makePingCall = (error, stdout, stderr) => {
      const start = stdout.indexOf("time=");
      const end = stdout.indexOf("TTL=");
      const output = stdout.slice(start + 5, end);
      message.reply("Ping data: ***" + output + "***");
    };

    exec(`ping ${host} -n 1`, makePingCall);
  } catch (error) {
    console.error(error);
  }
};

export const pingCommand = async (message, args) => {
  try {
    const ping = require("ping");

    const channelType = message.channel.name ?? "private message";
    systemPing("singapore841.discord.gg", message);
    var host = "singapore841.discord.gg";

    let result = await ping.promise.probe(host);
    console.log("RESULT", result);

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
