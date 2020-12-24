import { penisCommand } from "./components/penis/index";
import { pingCommand } from "./components/ping/index";
import { playMusic } from "./components/music/index";

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

  discordBot.login(
    "NzkwMTQ5Nzk4MjA4NDcxMDcw.X98aWA.d7g3Rctihpnw6tiIl41dlZ2qowQ"
  );
};

export default DiscordBotApp;

export const TwitterApp = async (message, args) => {
  const Twitter = require("twitter-v2");
  //Twitter Client Credential Declarations
  const client = new Twitter({
    consumer_key: "qSNpJrFaC9Q8xz5XKisXrF7CE",
    consumer_secret: "1gHTs2gsPxUzUrH61QQ6jSqbm4kzLePw5OvCQFlV4JGAq1cjbR",
    access_token_key: "2351301588-LwwoaxH8mFNrvfHE0cdByvppGXkc5XKgiGad9Fc",
    access_token_secret: "xpkTD9K6Tvs4HATuy7UWY14NNVFNCmx248ubyLXTSbPRL",
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
