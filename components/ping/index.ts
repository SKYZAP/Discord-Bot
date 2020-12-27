import { log } from "../../utils/index";

export const pingCommand = (message, args) => {
  const moment = require("moment");
  let now = moment().millisecond();
  message.reply("Your ping is ***" + now + "ms***");

  const channelType = message.channel.name ?? "private message";

  log(
    "[BerdBot] - " +
      message.author.username +
      " used command ping in " +
      channelType +
      " channel",
    "lightblue"
  );
};
