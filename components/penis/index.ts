import { log } from "../../utils/index";

export const penisCommand = (message, args) => {
  const length = Math.floor(Math.random() * 24);
  message.reply("your penis is " + length.toString() + " inches");

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
