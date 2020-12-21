export const penisCommand = (message, args) => {
  const length = Math.floor(Math.random() * 24);
  message.reply("Your penis is " + length.toString() + " inches");
};
