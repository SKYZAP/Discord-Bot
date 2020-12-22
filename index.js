import { penisCommand } from "./components/penis/index.js";
import { pingCommand } from "./components/ping/index.js";
// import { musicPlay } from "./components/music/play.js";
// import { musicStop } from "./components/music/stop.js";
import { musicDestroy } from "./components/music/destroy.js";
import Discord from "discord.js";

const discordBot = new Discord.Client();

import Player from "discord-player";
const player = new Player(discordBot);
discordBot.player = player;

const prefix = "/";

discordBot.once("ready", () => {
    console.log("[BerdBot] Ready to go!");
});

discordBot.on("message", async(message) => {
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
        let track = await discordBot.player.stop(message.guild.id);
        message.channel.send(`ZAWARUDO`);
    } else if (command === "play") {
        let track = await discordBot.player.play(message.member.voice.channel, args[0], message.member.user.tag);
        message.channel.send(`Currently playing ${track.name}! - Requested by ${track.requestedBy}`);
    } else if (command === "destroy") {
        musicDestroy(message, args);
    } else if (command === "pause") {
        let track = await discordBot.player.pause(message.guild.id);
        message.channel.send("Hold up waita minute")
    } else if (command === "remove") {
        let track = await discordBot.player.remove(message.member.voice.channel, args[''], message.member.user.tag);
        message.channel.send(`Removing requested song`);
    } else if (command === "resume") {
        let track = await discordBot.player.resume(message.guild.id);
        message.channel.send(`Time is resumed`)
    } else if (command === "ping") {
        pingCommand(message, args);
    }
});

discordBot.login("NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ");