import { penisCommand } from "./components/penis/index";
import { pingCommand } from "./components/ping/index";
import { playMusic, musicQueue, musicResume, musicPause, musicSkip, musicDestroy, musicClearQ } from "./components/music/index";



const DiscordBotApp = () => {
  const Discord = require("discord.js");
  const discordBot = new Discord.Client();

  // Music Player Setup
  const { Player } = require("discord-player");
  const player = new Player(discordBot);
  discordBot.player = player;

  const prefix = "/";

  discordBot.once("ready", () => {
    console.log("[BerdBot] Ready to go!");
  });

  discordBot.player
    .on("trackStart", (message, track) =>
      message.channel.send(`Now playing ${track.title}...`)
    )
    .on("trackAdd", (message, track) => {
      const queueLength = track.tracks.length - 1;
      message.channel.send(
        `${track.tracks[queueLength].title} has now been queued...`
      )
    })

  discordBot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "truth") {
      message.channel.send("Ben is gay");
    } else if (command === "lie") {
      message.channel.send(message.author.username + " is a beeg burd");
    } else if (command === "penis") {
      penisCommand(message, args);
    } else if (command === "ping") {
      pingCommand(message, args);
    } else if (command === "play") {
      playMusic(discordBot, message, args);
    } else if (command === "skip") {
      musicSkip(discordBot, message);
    } else if (command === "destroy") {
      musicDestroy(discordBot, message);
    } else if (command === "pause") {
      musicPause(discordBot, message);
      // } else if (command === "remove") {
      //   musicRemove(discordBot, message, track);
    } else if (command === "resume") {
      musicResume(discordBot, message);
    } else if (command === "queue") {
      musicQueue(discordBot, message);
    } else if (command === "clear queue") {
      musicClearQ(discordBot, message);
    }
  });

  discordBot.login(
    "NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ"
  );
};

export default DiscordBotApp;
