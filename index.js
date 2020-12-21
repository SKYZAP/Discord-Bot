import { penisCommand } from "./components/penis/index.js";
import { pingCommand } from "./components/ping/index.js";
import Discord from "discord.js";

const discordBot = new Discord.Client();

const prefix = "/";

discordBot.once("ready", () => {
  console.log("Berd is the word!");
});

discordBot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "truth") {
    message.channel.send("Ben is gay");
  } else if (command === "lie") {
    message.channel.send("The one who typed that command is gay");
  } else if (command === "penis") {
    penisCommand(message, args);
  } else if (command === "ping") {
    pingCommand(message, args);
  }
});

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");
