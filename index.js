const Discord = require("discord.js");

const discordBot = new Discord.Client();

discordBot.once("ready", () => {
  console.log("Berd is the word!");
});

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");
