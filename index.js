const Discord = require("discord.js");

const discordBot = new Discord.Client();

const prefix = "/";

discordBot.once("ready", () => {
  console.log("Berd is the word!");
});

discordBot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
});

// discordBot.on("message", () => {
//   let args = message.content.substring(PREFIX.length).split(" ");

//   switch (args[0]) {
//     case "react":
//       break;
//   }
// });

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");
