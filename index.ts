import {
  pingCommand,
  penisCommand,
  slapCommand,
  resetLength,
} from "./components/misc/index";
import {
  playMusic,
  musicQueue,
  musicResume,
  musicPause,
  musicSkip,
  musicDestroy,
  musicClearQ,
  musicRemove,
  toggleFilter,
  resetFilter,
} from "./components/music/index";
import { helpCommand } from "./components/help/index";
import { addReminder, Reminder } from "./src/models/reminder";
import { getConnection } from "typeorm";
import * as moment from "moment";
import { RateLimiter } from 'discord.js-rate-limiter';


const DiscordBotApp = () => {
  require("dotenv").config();
  var cron = require("node-cron");
  const Discord = require("discord.js");
  const discordBot = new Discord.Client({
    presence: {
      status: "online",
      activity: { name: "/help", type: "LISTENING" },
    },
  });
  const chalk = require("chalk");
 
  //Rate Limiter Setup
  let rateLimiter = new RateLimiter(1, 2000);

  // Music Player Setup
  const { Player } = require("discord-player");
  const player = new Player(discordBot);
  discordBot.player = player;

  const prefix = "-";

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
    let limited = rateLimiter.take(message.author.id);
      if (limited) {
          // Send back a message (or you may want to just drop the request)
          message.channel.send(`You're doing that do often, please try again later!`);
          return;
      }

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
    } else if (command === "filter") {
      toggleFilter(discordBot, message, args);
    } else if (command === "reset") {
      resetFilter(discordBot, message);
    } else if (command === "feedback") {
      // message.channel.send("<@!329080429854588928> Ben has been slapped");
    } else if (command === "slap") {
      slapCommand(discordBot, message, args);
    } else if (command === "res") {
      console.log("reset");
      resetLength(message);
    } else if (command === "remind") {
      addReminder(discordBot, message, args);
    }
  });

  cron.schedule("* * * * *", () => {
    //Runs commands every minute
    sendReminder(discordBot);
  });

  discordBot.login(process.env.TOKEN);
};

const sendReminder = async (discordBot) => {
  const con = getConnection();
  let repository = con.getRepository(Reminder);

  const reminders = await repository.find({ relations: ["user"] });
  console.log("Reminders have been fetched: " + `${reminders.length}`);

  reminders.map(async (r) => {
    const currentTime = moment()
      .utc(false)
      .utcOffset(r.offset, false)
      .format("DD-MM-YYYY HH:mm");

    const dbTime = moment(r.time).utc(false).format("DD-MM-YYYY HH:mm");

    if (currentTime === dbTime) {
      discordBot.users.fetch(`${r.user.discordId}`).then(async (user) => {
        await user.send(
          ":exclamation::exclamation:`Reminder for: " +
            r.message +
            " AT " +
            r.time +
            "`:exclamation::exclamation:"
        );
      });
      await repository.delete(r);
    }
    console.log(
      "CURRENT TIME = ",
      currentTime,
      " DBTIME = ",
      dbTime,
      " CONDITION = ",
      currentTime === dbTime
    );
    console.log("CC: ", r.offset);
  });
};

export default DiscordBotApp;
