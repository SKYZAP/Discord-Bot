import {
  pingCommand,
  penisCommand,
  slapCommand,
  resetLength,
} from "./src/components/misc/index";
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
} from "./src/components/music/index";
import { helpCommand } from "./src/components/help/index";
import { addReminder, Reminder } from "./src/models/reminder";
import { getConnection } from "typeorm";
import * as moment from "moment";
import { RateLimiter } from "discord.js-rate-limiter";
import { bMov } from "./src/components/meme/bmov";
import {
  bonkCommand,
  cmmCommand,
  facepalmCommand,
  hitlerCommand,
  jailCommand,
  ohNoCommand,
  opinionCommand,
  triggeredCommand,
} from "./src/components/meme";
const paginationEmbed = require("discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const discordTTS = require("discord-tts");

const DiscordBotApp = () => {
  require("dotenv").config();
  var cron = require("node-cron");
  const Discord = require("discord.js");
  const discordBot = new Discord.Client({
    presence: {
      status: "online",
      activity: { name: "!help", type: "LISTENING" },
    },
  });
  const chalk = require("chalk");

  //Rate Limiter Setup
  let rateLimiter = new RateLimiter(1, 2000);

  // Music Player Setup
  const { Player } = require("discord-player");
  const player = new Player(discordBot);
  discordBot.player = player;

  const prefix = process.env.PREFIX;

  discordBot.once("ready", () => {
    console.log(chalk.keyword("limegreen")("[BerdBot] - Ready to go!"));
  });

  discordBot.player
    .on("trackStart", (message, track) =>
      message.channel.send(`> [PLAY] Now playing ${track.title}...`),
    )
    .on("trackAdd", (message, track) => {
      const queueLength = track.tracks.length - 1;
      message.channel.send(
        `> [QUEUE] ${track.tracks[queueLength].title} has now been queued...`,
      );
    })
    .on("searchResults", (message) => {
      message.channel.send(`> [SEARCH] Currently searching`);
    })
    .on("noResults", (message) => {
      message.channel.send(`> [SEARCH] No search results`);
    });

  discordBot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
      if (message.content === "ya like jazz?") {
        const broadcast = discordBot.voice.createBroadcast();
        var channelId = message.member.voice.channelID;
        var channel = discordBot.channels.cache.get(channelId);
        channel.join().then((connection) => {
          broadcast.play(discordTTS.getVoiceStream(`${bMov}`));
          connection.play(broadcast);
        });
      } else {
        return;
      }
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let limited = rateLimiter.take(message.author.id);
    if (limited) {
      // Send back a message (or you may want to just drop the request)
      message.channel.send(
        `You're doing that do often, please try again later!`,
      );
      return;
    }

    // List of Discord Bot commands
    switch (command) {
      case "truth": {
        message.channel.send(
          "Hakim is very very very very extremely super duperly ghey",
        );
        break;
      }
      case "lie": {
        message.channel.send("<@407414975376654336> is a beeg burd");
        break;
      }
      case "penis": {
        penisCommand(discordBot, message, args);
        break;
      }
      case "ping": {
        pingCommand(message, args);
        break;
      }
      case "play": {
        playMusic(discordBot, message, args);
        break;
      }
      case "skip": {
        musicSkip(discordBot, message);
        break;
      }
      case "destroy": {
        musicDestroy(discordBot, message);
        break;
      }
      case "pause": {
        musicPause(discordBot, message);
        break;
      }
      case "remove": {
        musicRemove(discordBot, message, args);
        break;
      }
      case "resume": {
        musicResume(discordBot, message);
        break;
      }
      case "queue": {
        musicQueue(discordBot, message);
        break;
      }
      case "clearq": {
        musicClearQ(discordBot, message);
        break;
      }
      case "help": {
        helpCommand(discordBot, message, args);
        break;
      }
      case "filter": {
        toggleFilter(discordBot, message, args);
        break;
      }
      case "reset": {
        resetFilter(discordBot, message);
        break;
      }
      case "feedback": {
        // message.channel.send("<@!329080429854588928> Ben has been slapped");
        break;
      }
      case "slap": {
        slapCommand(discordBot, message, args);
        break;
      }
      case "res": {
        console.log("reset");
        resetLength(message);
        break;
      }
      case "remind": {
        addReminder(discordBot, message, args);
        break;
      }
      case "test": {
        const embed1 = new MessageEmbed()
          .setAuthor("Berd-Bot", `${discordBot.user.displayAvatarURL()}`)
          .setTitle("First Page")
          .addFields({ name: "Song 1", value: "Queue Position" });
        const embed2 = new MessageEmbed()
          .setAuthor("Berd-Bot", `${discordBot.user.displayAvatarURL()}`)
          .setTitle("Second Page")
          .addFields({ name: "Song 2", value: "Queue Position" });

        // Create an array of embeds
        const pages = [embed1, embed2];
        paginationEmbed(message, pages);
        break;
      }
      case "bonk": {
        bonkCommand(discordBot, message, args);
        break;
      }
      case "triggered": {
        triggeredCommand(message);
        break;
      }
      case "cmm": {
        cmmCommand(message, args);
        break;
      }
      case "ohno": {
        ohNoCommand(message, args);
        break;
      }
      case "opinion": {
        opinionCommand(message, args);
        break;
      }
      case "facepalm": {
        facepalmCommand(message);
        break;
      }
      case "hitler": {
        hitlerCommand(message);
        break;
      }
      case "jail": {
        jailCommand(discordBot, message, args);
        break;
      }
      case "animetiddies": {
        // addTiddies(message, args);
        message.channel.send("Its Ramadhan my brothas!, no horni");
        break;
      }
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
            "`:exclamation::exclamation:",
        );
      });
      await repository.delete(r);
    }
  });
};

export default DiscordBotApp;
