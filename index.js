import { penisCommand } from "./components/penis/index.js";
import { pingCommand } from "./components/ping/index.js";
import { musicPlay } from "./components/music/play.js";
import { musicStop } from "./components/music/stop.js";
import { musicDestroy } from "./components/music/destroy.js";
import Discord from "discord.js";

const discordBot = new Discord.Client();

const prefix = "/";

discordBot.once("ready", () => {
    console.log("[BerdBot] Ready to go!");
});

discordBot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "truth") {
        message.channel.send("Ben is gay");
    } else if (command === "lie") {
        message.channel.send(message.author.username + " is a beeg burd");
    } else if (command === "penis") {
        message.channel.send(penisCommand());
    } else if (command === "stop") {
        musicStop(message, args);
    } else if (command === "play") {
        musicPlay(message, args);
    } else if (command === "destroy") {
        musicDestroy(message, args);
    } else if (command === "ping") {
        pingCommand(message, args);
    }
});

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");