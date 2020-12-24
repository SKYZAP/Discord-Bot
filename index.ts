import { penisCommand } from "./components/penis/index";
import { pingCommand } from "./components/ping/index";
import { playMusic } from "./components/music/index";

const DiscordBotApp = () => {
  const dotenv = require("dotenv");
  dotenv.config();
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
      );
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
      penisCommand(message, args);
    } else if (command === "ping") {
      pingCommand(message, args);
    } else if (command === "play") {
      playMusic(discordBot, message, args);
    } else if (command === "skip") {
      discordBot.player.skip(message);
    } else if (command === "tweethere") {
      TwitterApp(message, args);
    }
  });

  discordBot.login(process.env.DISCORD_TOKEN);
};

export default DiscordBotApp;

export const TwitterApp = async (message, args) => {
  const dotenv = require("dotenv");
  dotenv.config();
  const Twitter = require("twitter-v2");
  //Twitter Client Credential Declarations
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  //Error Catching Statement For Twitter API Query
  try {
    // Gets the user Id for the username typed out by the user
    const results = await client.get("users/by", { usernames: `${args[0]}` });
    console.log("User =", results.data);
    const id = results.data[0].id;
    // Created a tweet stream to get the 10 latest tweets for said user
    const stream = await client.stream(`users/${await id}/tweets`, {
      exclude: "retweets,replies",
    });

    message.channel.send("Sending Tweets...");

    for await (const { data } of stream) {
      // Maps the data being streamed from the API into the data variable
      console.log(data);
      const length = await data.length;
      console.log("LENGTH ", length);

      for (var i = 0; i < length; i++) {
        // Loops through the data variable to print out the tweets in a formatted manner
        // Start and End are used to store the locations of links within the data text String
        const start = await data[i].text.indexOf("https://t");
        const end = await data[i].text.length;
        // New Text is the text before the link
        // New Link is just the links contained within the tweet (can be 2 or more)
        const newText = await data[i].text.slice(0, start);
        const newLink = await data[i].text.slice(start, end);
        if (i === 0)
          message.channel.send(
            "===================================================================================================================="
          );
        message.channel.send("***" + newText + "***\n");
        message.channel.send(await newLink);
        message.channel.send(
          "===================================================================================================================="
        );
      }
    }
  } catch (error) {
    // If not successful then this message pops up and errors are logged to terminal
    message.channel.send("Failed to get tweets...");
    console.log("ERROR ", error);
  }
};
