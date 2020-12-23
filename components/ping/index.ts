export const pingCommand = (message, args) => {
  const moment = require("moment");
  let now = moment().millisecond();
  message.reply("Your ping is " + now + "ms");
};
