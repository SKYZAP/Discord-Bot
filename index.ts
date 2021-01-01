import { penisCommand } from "./components/penis/index";
import { pingCommand } from "./components/ping/index";
import {
  playMusic,
  musicQueue,
  musicResume,
  musicPause,
  musicSkip,
  musicDestroy,
  musicClearQ,
  musicRemove,
} from "./components/music/index";
import { helpCommand } from "./components/help/index";

const DiscordBotApp = () => {
  require("dotenv").config();
  const Discord = require("discord.js");
  const discordBot = new Discord.Client({
    presence: {
      status: "online",
      activity: { name: "/help", type: "LISTENING" },
    },
  });
  const chalk = require("chalk");

  // Music Player Setup
  const { Player } = require("discord-player");
  const player = new Player(discordBot);
  discordBot.player = player;

  const prefix = "/";

  discordBot.once("ready", () => {
    console.log(chalk.keyword("limegreen")("[BerdBot] - Ready to go!"));
  });

  discordBot.player
    .on("trackStart", (message, track) =>
      message.channel.send(`> [PLAY] Now playing ${track.title}...`)
    )
    .on("trackAdd", (message, track) => {
      const queueLength = track.tracks.length - 1;
      message.channel.send(
        `> [QUEUE] ${track.tracks[queueLength].title} has now been queued...`
      );
    })
    .on("searchResults", (message) => {
      message.channel.send(`> [SEARCH] Currently searching`);
    })
    .on("noResults", (message) => {
      message.channel.send(`> [SEARCH] No search results`);
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
      penisCommand(discordBot, message, args);
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
    } else if (command === "remove") {
      musicRemove(discordBot, message, args);
    } else if (command === "resume") {
      musicResume(discordBot, message);
    } else if (command === "queue") {
      musicQueue(discordBot, message);
    } else if (command === "clearq") {
      musicClearQ(discordBot, message);
    } else if (command === "help") {
      helpCommand(discordBot, message, args);
    }
  });

  discordBot.login(process.env.TOKEN);
};

export default DiscordBotApp;
