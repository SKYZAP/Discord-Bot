import { getUserFromMention, log } from "../../utils/index";

export const penisCommand = (message, args) => {
  const length = Math.floor(Math.random() * 24);

  if (args[0]) {
    const user = getUserFromMention(args[0]);
    if (!user) return message.reply("User not found");
    message.channel.send(
      `${user.tag} penis size is ***` + length.toString() + " inches***"
    );
  }

  message.reply("your penis size is ***" + length.toString() + " inches***");

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
