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

export const pingCommand = async (message, args) => {
  try {
    const ping = require("net-ping");

    var options = {
      networkProtocol: ping.NetworkProtocol.IPv4,
      packetSize: 16,
      retries: 1,
      sessionId: process.pid % 65535,
      timeout: 2000,
      ttl: 128,
    };

    var session = ping.createSession(options);

    session.pingHost("213.179.200.234", function (error, target, sent, rcvd) {
      var ms = rcvd - sent;
      if (error) console.log(target + ": " + error.toString());
      else message.reply("your ping is***" + ms + "ms***");
    });

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
