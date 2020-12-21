import { penisCommand } from "./components/penis/index.js";

import Discord from "discord.js";
import { musicPlay } from "./components/music/play.js";


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
        message.channel.send("ben is gay");
    } else if (command === "lie") {
        message.channel.send("the one who typed that command is gay");
    } else if (command === "penis") {
        message.channel.send(penisCommand());
    } else if (command === "stop") {
        discordBot.components.get(musicStop());
    } else if (command === "play") {
        musicPlay(message, args);
    } else if (command === "destroy") {
        discordBot.components.get(musicDestroy());
    }
});

// discordBot.on("message", () => {
//   let args = message.content.substring(PREFIX.length).split(" ");

//   switch (args[0]) {
//     case "react":
//       break;
//   }
// });

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");